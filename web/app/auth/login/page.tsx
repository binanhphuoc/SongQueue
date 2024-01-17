"use client"

import { signInWithGoogle } from "@/app/_services/authenticator/actions"

export default function LoginForm() {
  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={"mb-3 text-2xl text-gray-900"}>
        Please log in to continue.
      </h1>
      <button
        className="mt-4 w-full text-gray-900"
        onClick={() => {
          signInWithGoogle().catch((e) => {
            console.error(e)
          })
        }}
      >
        Sign in with Google
      </button>
    </div>
  )
}
