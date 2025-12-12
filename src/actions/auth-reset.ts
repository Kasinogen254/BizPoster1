'use server';

import { db } from '@/src/db';
import { users, verificationTokens } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { forgotPasswordSchema, resetPasswordSchema } from '@/src/lib/validations/auth';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const RATE_LIMIT_MAP = new Map<string, number>(); // Simple in-memory rate limiter

// 1. REQUEST PASSWORD RESET
export async function requestPasswordReset(formData: z.infer<typeof forgotPasswordSchema>) {
  try {
    // A. Validation
    const validatedFields = forgotPasswordSchema.safeParse(formData);
    if (!validatedFields.success) return { error: "Invalid email format" };

    const email = validatedFields.data.email;

    // B. Rate Limiting (Simple)
    const lastAttempt = RATE_LIMIT_MAP.get(email) || 0;
    if (Date.now() - lastAttempt < 60000) { // 1 minute cooldown
      return { error: "Please wait 1 minute before trying again." };
    }
    RATE_LIMIT_MAP.set(email, Date.now());

    // C. Check User
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (!existingUser[0]) return { success: true }; // Fake success to prevent Email Enumeration attacks

    // Check if they are a Google user (no password)
    if (!existingUser[0].password) {
      return { error: "This account uses Google Sign In. Please login with Google." };
    }

    // D. Generate Token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

    // Save Token (Reuse verificationTokens table)
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
    await db.insert(verificationTokens).values({ identifier: email, token, expires });

    // E. Send Email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}`;
    
    await resend.emails.send({
      from: 'BizPoster <security@resend.dev>', // Change to your domain in production
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click here to reset your password: <a href="${resetLink}">Reset Password</a></p><p>Link expires in 1 hour.</p>`,
    });

    return { success: true };

  } catch (error) {
    console.error("Reset Request Error:", error);
    return { error: "Something went wrong." };
  }
}

// 2. RESET PASSWORD
export async function resetPassword(token: string, email: string, formData: z.infer<typeof resetPasswordSchema>) {
  try {
    // A. Validation
    const validatedFields = resetPasswordSchema.safeParse(formData);
    if (!validatedFields.success) return { error: "Invalid password format" };

    const { password } = validatedFields.data;

    // B. Verify Token
    const storedToken = await db.select().from(verificationTokens).where(eq(verificationTokens.identifier, email));
    
    if (!storedToken[0] || storedToken[0].token !== token) {
      return { error: "Invalid or expired token" };
    }

    if (new Date() > storedToken[0].expires) {
      return { error: "Token expired. Please request a new one." };
    }

    // C. Update Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.email, email));

    // D. Cleanup
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    return { success: true };

  } catch (error) {
    console.error("Reset Password Error:", error);
    return { error: "Failed to reset password." };
  }
}