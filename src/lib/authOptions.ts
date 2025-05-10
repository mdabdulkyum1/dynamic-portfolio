import type { ExtendedSession, ExtendedToken, ExtendedUser } from "@/types/next-auth";

import type { Account, NextAuthOptions, Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import Users from "../../models/Users";
import connectDB from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: ExtendedUser;
      account: Account | null;
    }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, name, image } = user;

        await connectDB();

        let existingUser = await Users.findOne({ providerAccountId });

        if (!existingUser) {
          const payload = {
            providerAccountId,
            provider,
            email,
            name,
            image,
            role: "user",
          };

          try {
            existingUser = await Users.create(payload);
            console.log("User created successfully:", existingUser);
          } catch (error) {
            console.error("Error creating user:", error);
            return false;
          }
        }

        user._id = existingUser._id.toString();
        user.role = existingUser.role;
      }

      return true;
    },

    async jwt({
      token,
      user,
    }: {
      token: ExtendedToken;
      user?: ExtendedUser;
    }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.id = user._id;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: ExtendedToken;
    }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          image: token.picture,
          _id: token.id,
          role: token.role,
        },
      };
    },
  },
};
