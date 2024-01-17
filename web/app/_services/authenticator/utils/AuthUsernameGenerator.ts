import crypto from "crypto"

export function generateUniqueUsername(
  existingUsernames: string[],
  inferredUsername: string
) {
  const similarUsernames = new Set(existingUsernames)
  let bestUniqueUsername = inferredUsername
  let i = 0
  while (similarUsernames.has(bestUniqueUsername) && i < 20) {
    bestUniqueUsername = `${inferredUsername}.${crypto
      .randomBytes(3)
      .toString("hex")}`
    i++
  }

  if (similarUsernames.has(bestUniqueUsername)) {
    throw new Error("Can't find a unique username")
  }

  return bestUniqueUsername
}
