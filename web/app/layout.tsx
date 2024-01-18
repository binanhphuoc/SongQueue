import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import { auth } from "./_services/authenticator"
import type { Metadata } from "next"
import "./globals.css"
import TanStackProvider from "./_providers/TanStackProvider"
import IntroAnimation from "./_components/IntroAnimation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Song Queue",
  description: "Web app to register songs",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,

      username: session.user.username,
      password: "",
    }
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <TanStackProvider>
            <div className="min-h-screen min-w-screen bg-black flex justify-center">
              {/* Container */}
              <IntroAnimation>{children}</IntroAnimation>
            </div>
          </TanStackProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
