import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET, // for session encryption
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
      }

      return session;
    },
  },
});
