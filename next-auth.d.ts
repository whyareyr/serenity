// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // You can add other properties as needed
    } & DefaultSession["user"]; // Merging the default user properties like name, email, image
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // The subject, which is typically the user ID
  }
}
