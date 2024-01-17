'use server'

import { signIn, signOut as signOutInternal } from '..'

export async function signInWithGoogle() {
  try {
    await signIn('google')
  } catch (error) {
    throw error
  }
}

export async function signOut() {
  try {
    await signOutInternal()
  } catch (error) {
    throw error
  }
}
