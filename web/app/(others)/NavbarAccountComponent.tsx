"use client"

import { signOut } from "../_services/authenticator/actions"
import Link from "next/link"

export default function NavAccount() {
  return (
    <>
      <Link href="/account">Account</Link>
      <button
        onClick={() => {
          signOut()
        }}
      >
        Log Out
      </button>
    </>
  )
}
