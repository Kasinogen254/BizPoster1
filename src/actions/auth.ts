'use server';

import { db } from '@/src/db';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { RegistrationData } from '@/src/types/auth';

export async function registerUser(data: RegistrationData) {
  try {
    // 1. Validate input exists
    if (!data.email || !data.password || !data.username) {
      return { error: 'Missing required fields' };
    }

    // 2. Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (existingUser.length > 0) {
      return { error: 'Email already exists' };
    }

    // 3. Hash the password (Security Best Practice)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 4. Insert into Database
    await db.insert(users).values({
      email: data.email,
      username: data.username,
      password: hashedPassword,
      image: '', // Optional: Add default avatar URL here
      emailVerified: new Date(), // They verified via OTP on frontend
      onboardingCompleted: false, // This triggers the Magic Flow
    });

    return { success: true };

  } catch (error) {
    console.error('Registration Error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}