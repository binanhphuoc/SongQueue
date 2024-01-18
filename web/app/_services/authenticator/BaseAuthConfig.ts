import { NextRequest } from "next/server"
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: any
      request: NextRequest
    }) {
      const isLoggedIn = !!auth?.user

      if (isLoggedIn && nextUrl.pathname !== "/") {
        return Response.redirect(new URL("/", nextUrl))
      }

      return true
    },

    async signIn({ user, profile }) {
      // On sign in, validate if user has an email provided
      if (
        user.username === process.env.USERNAME &&
        user.password === process.env.PASSWORD
      ) {
        return true
      }
      return false
    },

    async session({ session }) {
      return session
    },

    async jwt({ token }) {
      return token
    },
  },

  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
