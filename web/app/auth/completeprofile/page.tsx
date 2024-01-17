"use client"

import { completeProfileForUser } from "./actions"
import { signOut } from "@/app/_services/authenticator/actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CompleteProfile() {
  const session = useSession()
  const router = useRouter()
  return (
    <>
      <form
        action={(formData: FormData) => {
          if (session.data?.user?.email) {
            completeProfileForUser(
              session.data?.user?.email,
              formData.get("name") as string
            )
              .then(() => {
                return session.update({ shouldSignUp: false })
              })
              .then(() => {
                router.refresh()
              })
              .catch((e) => {
                console.error(e)
              })
          }
        }}
        className="space-y-3"
      >
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={"mb-3 text-2xl text-gray-900"}>
            Almost there! Finish creating account for full experience.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-gray-900 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>
          </div>
          <button className="text-gray-900">Create account</button>
        </div>
      </form>
      <button
        onClick={async () => {
          signOut().catch((e) => {
            console.error(e)
          })
        }}
      >
        Logout
      </button>
    </>
  )
}
