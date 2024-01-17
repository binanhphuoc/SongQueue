"use server"

import { db } from "@/app/_services/Database"
import { auth } from "@/app/_services/authenticator"
import { generateUniqueUsername } from "@/app/_services/authenticator/utils/AuthUsernameGenerator"

export async function completeProfileForUser(email: string, name: string) {
  const session = await auth()
  if (!session?.user) {
    throw new Error("Not authorized")
  }
  const inferredUserName = email.substring(0, email.indexOf("@"))
  const dbUsersWithSimilarUsername = await db.user.findMany({
    where: {
      username: {
        startsWith: inferredUserName,
      },
    },
  })
  const newUsername = generateUniqueUsername(
    dbUsersWithSimilarUsername.map(({ username }) => username),
    inferredUserName
  )
  return db.user.create({
    data: {
      email,
      name,
      username: newUsername,
    },
  })
}
