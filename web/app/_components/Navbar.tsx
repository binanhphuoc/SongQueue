"use client"

import Link from "next/link"
import React from "react"
import { useSession } from "next-auth/react"
import { signOut } from "../_services/authenticator/actions"

export default function Navbar() {
  const session = useSession()
  const user = session.data?.user

  return (
    <div className="flex justify-between items-center  w-full p-4 mb-3">
      <h1 className="text-4xl text-[rgba(0,0,0,0.70)] font-extrabold">
        Up next
      </h1>

      {!user && (
        <Link href={"/auth/login"}>
          <p className="text-[rgba(0,0,0,0.70)] cursor-pointer">Admin Login</p>
        </Link>
      )}

      {user && (
        <p
          className="text-[rgba(0,0,0,0.70)] cursor-pointer"
          onClick={() => {
            signOut()
          }}
        >
          Logout
        </p>
      )}
    </div>
  )
}
