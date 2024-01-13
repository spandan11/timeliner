import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "@/prisma";
import env from "@/configs/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user || !user.password) {
            throw new Error("Email doesn't exist");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }
          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ token, session }) {
      if (session?.user) {
        session.user.id = token.sub as string; // session.user.id = token.id as string;
      }
      return session;
    },
  },
  jwt: {
    secret: `${env.NEXTAUTH_JWT_SECRET}`,
    maxAge: 60 * 60 * 24 * 30, //30 days
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, //30 days
    updateAge: 60 * 60 * 24, //24 hours
  },
  pages: {
    signIn: "/login",
    signOut: "/register",
    error: "/login",
  },
  secret: `${env.NEXTAUTH_SECRET}`,
  adapter: PrismaAdapter(db),
  debug: process.env.NODE_ENV === "development",
};
