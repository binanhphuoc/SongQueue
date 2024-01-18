import React from "react"

import { Song } from "@prisma/client"
import Navbar from "./_components/Navbar"
import MainContent from "./_components/MainContent"

export default async function Home() {
  const songsResult = await fetch(`${process.env.BASE_URL}/api/songs`, {
    next: {
      tags: ["songs"],
      revalidate: 4, // 4 seconds - interval 5 seconds revalidate in MainContent
    },
  })

  const songsData = (await songsResult.json()) as { songs: Song[] }
  const songs = songsData.songs

  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <MainContent songs={songs} />
    </React.Fragment>
  )
}
