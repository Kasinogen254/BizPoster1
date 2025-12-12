'use server';

import { Resend } from 'resend';
import { db } from '@/src/db';
import { verificationTokens } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto'; // Built-in Node module for secure numbers

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Generate & Send OTP
export async function sendOtp(email: string) {
  try {
    // SECURITY: Use crypto for secure random numbers instead of Math.random
    const token = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 mins

    // Clean up old tokens for this email first
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
    
    // Save new token
    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    // Send Email
    const { error } = await resend.emails.send({
      from: 'BizPoster <onboarding@resend.dev>', // Change this to your verified domain in production
      to: email, // REMINDER: On free tier, this MUST be your registered account email
      subject: 'Your Verification Code',
      html: `<p>Your BizPoster code is: <strong>${token}</strong></p>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: error.message };
    }

    return { success: true };

  } catch (error: unknown) {
    console.error("Send OTP System Error:", error);
    let message = "Failed to send code";
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
}

// 2. Verify OTP
export async function verifyOtpAction(email: string, code: string) {
  try {
    // Check if token exists and matches
    const tokens = await db.select()
      .from(verificationTokens)
      .where(and(
        eq(verificationTokens.identifier, email),
        eq(verificationTokens.token, code)
      ));

    if (tokens.length === 0) {
      return { error: "Invalid code" };
    }

    const token = tokens[0];
    
    // Check expiry
    if (new Date() > token.expires) {
      return { error: "Code expired" };
    }

    // SECURITY: Delete token immediately after use to prevent Replay Attacks
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    return { success: true };

  } catch (error: unknown) {
    console.error("Verify OTP Error:", error);
    return { error: "Verification failed" };
  }
}