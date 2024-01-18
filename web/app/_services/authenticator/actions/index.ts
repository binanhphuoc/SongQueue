"use server"

import { signIn, signOut as signOutInternal } from ".."

export async function signInWithGoogle() {
  return signIn("google")
}

export async function signInWithUsername(formData: {
  username: string
  password: string
}) {
  const { username, password } = formData
  return signIn("credentials", { username, password })
}

export async function signOut() {
  return signOutInternal()
}
