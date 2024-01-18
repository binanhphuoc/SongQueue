import Image from "next/image"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import BgImage from "@/public/bg-image.jpeg"
import { auth } from "./_services/authenticator"
import type { Metadata } from "next"
import "./globals.css"
import TanStackProvider from "./_providers/TanStackProvider"

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
              <div className="max-w-3xl w-full h-screen bg-red relative">
                {/* Background image */}
                <Image
                  src={BgImage.src}
                  height={BgImage.height}
                  width={BgImage.width}
                  alt="Background Image"
                  className="w-full h-full object-cover absolute top-0 z-0"
                />

                {/* Overlay */}
                <div className="w-full h-full absolute top-0 backdrop-blur-sm z-10" />

                {/* Content */}
                <main className="flex flex-col relative z-20 h-full">
                  {children}
                </main>
              </div>
            </div>
          </TanStackProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
