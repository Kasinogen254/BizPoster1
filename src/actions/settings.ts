'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: { businessName: string; industry: string }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Unauthorized" };
    }

    await db.update(users)
      .set({
        businessName: formData.businessName,
        industry: formData.industry,
        updatedAt: new Date(),
      })
      .where(eq(users.email, session.user.email));

    revalidatePath('/settings');
    // We also revalidate dashboard so the Navbar updates immediately
    revalidatePath('/templates'); 
    
    return { success: true };

  } catch (error) {
    console.error("Profile Update Error:", error);
    return { error: "Failed to update profile." };
  }
}