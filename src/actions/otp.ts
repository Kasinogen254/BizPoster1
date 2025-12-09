'use server';

import { Resend } from 'resend';
import { db } from '@/src/db';
import { verificationTokens } from '@/src/db/schema';
import { eq, and } from 'drizzle-orm';

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Generate & Send OTP

export async function sendOtp(email: string) {
  try {
    // Generate Code
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

    // DB Operations
    await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));
    
    await db.insert(verificationTokens).values({
      identifier: email,
      token,
      expires,
    });

    // Send Email
    const { data, error } = await resend.emails.send({
      from: 'BizPoster <onboarding@resend.dev>',
      to: email, // <--- ON FREE TIER, THIS MUST BE YOUR EMAIL
      subject: 'Your Verification Code',
      html: `<p>Your BizPoster code is: <strong>${token}</strong></p>`,
    });

    if (error) {
      console.error("Resend API Error:", error); // <--- CHECK SERVER TERMINAL FOR THIS
      return { error: error.message };
    }

    console.log("Email sent successfully to:", email);
    return { success: true };

  } catch (error: any) {
    console.error("Send OTP System Error:", error);
    return { error: error.message || "Failed to send code" };
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

    // Optional: Delete token after use to prevent replay attacks
    // await db.delete(verificationTokens).where(eq(verificationTokens.identifier, email));

    return { success: true };

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return { error: "Verification failed" };
  }
}