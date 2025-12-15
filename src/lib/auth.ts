import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
//import useSWR from "swr";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
    },
  },
  plugins: [nextCookies()],
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }, request) => {

  // void sendEmail({
  //   to: user.email,
  //   subject: "Verify your email address",
  //   text: `Click the link to verify your email: ${url}`,
  // });
  // },
  // },
});
