import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export interface ExtendedUser extends User {
  _id?: string;
  role?: string;
}

export interface ExtendedToken extends JWT {
  role?: string;
  id?: string;
}

export interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    _id?: string;
    role?: string;
  };
}

