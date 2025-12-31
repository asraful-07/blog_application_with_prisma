import { Prisma } from "@prisma/client/extension";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";

const auth = betterAuth({
  // Database connection (Prisma + PostgreSQL)
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),

  // Frontend URL (trusted)
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

  // Email + Password Authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // signup  auto login false
    requireEmailVerification: false, // Don't email verify
  },
});
