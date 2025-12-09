import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login", newUser: "/onboarding" },
  
  providers: [
    // 1. Email/Password
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
          email: user.email,
          name: user.username,
          image: user.image,
          onboardingCompleted: user.onboardingCompleted, 
        };
      }
    }),

    // 2. Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    // A. Handle Sign In Logic (Create Google User if new)
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) return false;

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length === 0) {
          // CREATE NEW GOOGLE USER
          await db.insert(users).values({
            email: email,
            username: user.name || email.split('@')[0],
            image: user.image,
            emailVerified: new Date(), // Google emails are verified by default
            onboardingCompleted: false,
          });
        }
      }
      return true;
    },

    // B. Add Custom Data to Token
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.onboardingCompleted) {
         token.onboardingCompleted = session.onboardingCompleted;
      }

      if (user) {
        // Fetch latest data from DB to ensure onboarding status is correct
        const dbUser = await db.select().from(users).where(eq(users.email, user.email!)).limit(1);
        if (dbUser[0]) {
            token.id = dbUser[0].id;
            // @ts-ignore
            token.onboardingCompleted = dbUser[0].onboardingCompleted;
        }
      }
      return token;
    },

    // C. Pass Data to Client Session
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    },
  },
};