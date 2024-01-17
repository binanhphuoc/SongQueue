import type { NextAuthConfig, User } from 'next-auth'
import { db } from '../Database'
import { NextRequest } from 'next/server'
import { generateUniqueUsername } from './utils/AuthUsernameGenerator'

export const authConfig = {
  pages: {
    signIn: '/login',
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

      if (
        isLoggedIn &&
        auth.shouldSignUp &&
        !nextUrl.pathname.startsWith('/auth/completeprofile')
      ) {
        return Response.redirect(new URL('/auth/completeprofile', nextUrl))
      } else if (
        !isLoggedIn &&
        nextUrl.pathname.startsWith('/auth/completeprofile')
      ) {
        return Response.redirect(new URL('/auth/login', nextUrl))
      }

      if (nextUrl.pathname === '/') {
        return Response.redirect(
          new URL(isLoggedIn ? '/account' : '/about', nextUrl)
        )
      }

      if (
        nextUrl.pathname.startsWith('/auth') &&
        isLoggedIn &&
        !auth.shouldSignUp
      ) {
        return Response.redirect(new URL('/account', nextUrl))
      } else if (nextUrl.pathname.startsWith('/account') && !isLoggedIn) {
        return Response.redirect(new URL('/auth/login', nextUrl))
      }
      return true
    },
    async signIn({ user, profile }) {
      // On sign in, validate if user has an email provided
      if (!user.email || !profile?.email_verified) {
        return false
      }
      return true
    },
    async session({ session, token }: { session: any; token: any }) {
      session.shouldSignUp = token.shouldSignUp
      return session
    },
    async jwt({ token, user, profile, trigger, session }) {
      if (trigger === 'signIn') {
        token.shouldSignUp = await shouldCompleteProfileWhenSignUp(user)
      } else if (trigger === 'update') {
        token.shouldSignUp = session.shouldSignUp
      }
      return token
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig

async function shouldCompleteProfileWhenSignUp(user: User) {
  const inferredUserName = user.email!.substring(0, user.email!.indexOf('@'))
  const dbUsers = await db.user.findMany({
    where: {
      OR: [
        {
          email: user.email!,
        },
        {
          username: {
            startsWith: inferredUserName,
          },
        },
      ],
    },
  })

  // if there exists user with this email
  if (dbUsers.find((dbUser) => dbUser.email === user.email) != undefined) {
    return false
  }

  if (!user.name || user.name.trim().length === 0) {
    return true
  }

  const newUsername = generateUniqueUsername(
    dbUsers.map(({ username }) => username),
    inferredUserName
  )

  await db.user.create({
    data: {
      email: user.email!,
      username: newUsername,
      name: user.name,
    },
  })
  return false
}
