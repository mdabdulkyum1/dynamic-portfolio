import type { NextAuthOptions, User, Session, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "./db";
import Users from "../../models/Users";

interface ExtendedUser extends User {
  _id?: string;
  role?: string;
}

interface ExtendedToken extends JWT {
  role?: string;
  id?: string;
}

interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    _id?: string;
    role?: string;
  };
}

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
