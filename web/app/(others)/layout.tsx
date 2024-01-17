import { auth } from '@/app/_services/authenticator'
import Link from 'next/link'
import NavAccount from './NavbarAccountComponent'

export default async function OthersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <>
      <nav>
        <Link href="/">Just#Kudo</Link>
        {session?.user ? (
          <NavAccount />
        ) : (
          <Link href="/auth/login">Log In</Link>
        )}
      </nav>
      {children}
    </>
  )
}
