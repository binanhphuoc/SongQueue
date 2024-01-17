'use client'

import Link from 'next/link'
import { signOut } from '../_services/authenticator/actions'

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
