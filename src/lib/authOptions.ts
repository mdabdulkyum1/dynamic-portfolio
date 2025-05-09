import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import type { User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
// import type { Account, Profile } from "next-auth";

// import CredentialsProvider from "next-auth/providers/credentials";
// Import your loginUser function and db utilities
// import { loginUser } from "@/app/actions/auth/loginUser";

export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Email", type: "email", placeholder: "Enter Email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials) return null;

    //     const user = await loginUser(credentials); // your custom login logic
    //     if (user) {
    //       return user as User;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, name, image } = user;

        const userCollection = dbConnect(collectionNameObj.userCollection);
        const isExistUser = await userCollection.findOne({ providerAccountId });

        if (!isExistUser) {
          const payload = {
            providerAccountId,
            provider,
            email,
            name,
            image,
            role: "user",
          };
          await userCollection.insertOne(payload);
        }
      }
      return true;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.name = token.name;
        (session.user as any).role = token.role; 
      }
      return session;
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },
  },
};
