"use client"

import Link from "next/link"
import { useState } from "react"
import { signInWithUsername } from "@/app/_services/authenticator/actions"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    signInWithUsername({ username, password })
      .then(() => {
        console.log("Login Successfully")
      })
      .catch((err) => {
        console.error("Error", err)
      })
  }

  return (
    <form
      className="rounded-xl bg-[rgba(255,255,255,0.85)] flex flex-col w-full max-w-lg overflow-hidden gap-6 p-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label className="text-black">Username</label>
        <input
          className="text-black placeholder:text-slate-500 bg-transparent outline-none p-2 border-b-2 border-[rgba(128,128,128,1)] focus:border-[rgba(255,107,196,1)] transition-[border-color]"
          placeholder="Admin username..."
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-black">Password</label>
        <input
          type="password"
          className="text-black placeholder:text-slate-500 bg-transparent outline-none p-2 border-b-2 border-[rgba(128,128,128,1)] focus:border-[rgba(255,107,196,1)] transition-[border-color]"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>

      <button
        type="submit"
        className="bg-[#FF0E9F] p-2 rounded-lg font-bold mt-2 text-white"
      >
        Submit
      </button>

      <Link href={"/"} className="text-black flex justify-center">
        Back to home
      </Link>
    </form>
  )
}
