import { authConfig } from "./BaseAuthConfig"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
    }),
  ],
})
