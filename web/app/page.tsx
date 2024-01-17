import Image from "next/image"
import Link from "next/link"
import React from "react"
import AddButton from "@/public/add-button.png"
import SongItem from "./components/SongItem"
import CurrentPlayItem from "./components/CurrentPlayItem"
import { auth } from "./_services/authenticator"
import { signOut } from "./_services/authenticator/actions"

export default async function Home() {
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

  const user = session?.user

  const current = {
    number: 1,
    name: "Test",
    singers: ["Tu", "Bin"],
    tableNumber: "1",
  }

  const test = Array(20).fill(current)

  return (
    <React.Fragment>
      {/* Navbar */}
      <div className="flex justify-between items-center  w-full p-4 mb-3">
        <h1 className="text-4xl text-white font-extrabold">Up next</h1>

        {!user && (
          <Link href={"/auth/login"}>
            <p>Admin Login</p>
          </Link>
        )}

        {user && (
          <p
            onClick={() => {
              signOut()
            }}
          >
            Logout
          </p>
        )}
      </div>

      {/* Song items */}
      <div className="flex flex-col gap-3 px-4 grow overflow-auto">
        {test.map((data, idx) => (
          <SongItem key={idx} {...data} number={idx + 1} />
        ))}

        {/* Space */}
        <div className="h-20 flex-shrink-0" />
      </div>

      {/* Control */}
      <div className="flex flex-col relative">
        <div className="flex justify-end py-2 px-4 absolute -top-20 w-full">
          <Image
            src={AddButton.src}
            height={AddButton.height}
            width={AddButton.width}
            alt="Add Button"
            className="w-16 h-16 object-cover"
          />
        </div>

        <CurrentPlayItem {...current} />
      </div>
    </React.Fragment>
  )
}
