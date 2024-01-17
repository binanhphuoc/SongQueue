"use server"

import { signIn, signOut as signOutInternal } from ".."

export async function signInWithGoogle() {
  await signIn("google")
}

export async function signOut() {
  await signOutInternal()
}
