import { Prisma } from "@prisma/client/extension";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";

export const auth = betterAuth({
  // Database (Prisma + PostgreSQL)
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),

  // Trusted frontend URL
  trustedOrigins: [process.env.APP_URL!],

  // Custom User Fields
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },

  // Email + Password (NO email verification)
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  // Social Login (Google – verified by Google)
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
