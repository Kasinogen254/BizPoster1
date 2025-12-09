'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

interface OnboardingData {
  businessName: string;
  industry: string;
}

export async function completeOnboarding(data: OnboardingData) {
  try {
    // 1. Get the current logged-in user securely
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return { error: "Unauthorized" };
    }

    // 2. Update the user in the database
    await db.update(users)
      .set({
        businessName: data.businessName,
        industry: data.industry,
        onboardingCompleted: true, // Mark them as ready
        updatedAt: new Date(),
      })
      .where(eq(users.email, session.user.email));

    return { success: true };

  } catch (error) {
    console.error("Onboarding Error:", error);
    return { error: "Failed to save profile." };
  }
}