import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { 
    signIn: "/login", 
    // newUser is mostly for redirecting after provider signup, 
    // but we handle flow in middleware mostly.
    newUser: "/onboarding" 
  },
  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Invalid credentials");

        const userResult = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        const user = userResult[0];

        if (!user || !user.password) throw new Error("User not found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email!,
          name: user.username,
          image: user.image,
          onboardingCompleted: user.onboardingCompleted || false, 
        };
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length === 0) {
          await db.insert(users).values({
            email: email,
            username: user.name || email.split('@')[0],
            image: user.image,
            emailVerified: new Date(),
            onboardingCompleted: false,
          });
        }
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Handle client-side session updates (e.g., after onboarding completes)
      if (trigger === "update" && session?.onboardingCompleted !== undefined) {
         token.onboardingCompleted = session.onboardingCompleted;
      }

      if (user) {
        // This runs on initial sign-in
        const dbUser = await db.select().from(users).where(eq(users.email, user.email!)).limit(1);
        if (dbUser[0]) {
            token.id = dbUser[0].id;
            token.onboardingCompleted = dbUser[0].onboardingCompleted || false;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    },
  },
};