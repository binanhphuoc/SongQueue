import Link from "next/link"
import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Link href="/">Home</Link>
      {children}
    </div>
  )
}
