import React from "react"

import { Song } from "@prisma/client"
import SongItem from "./_components/SongItem"
import CurrentPlayItem from "./_components/CurrentPlayItem"
import Navbar from "./_components/Navbar"
import AddButton from "./_components/AddButton/AddButton"

export default async function Home() {
  const songsResult = await fetch(`${process.env.BASE_URL}/api/songs`, {
    next: {
      tags: ["songs"],
      revalidate: 5, // 5 seconds
    },
  })

  const songsData = (await songsResult.json()) as { songs: Song[] }

  const songs = songsData.songs
  const wailistSongs = songs.filter((val) => val.isplaying === 0)
  const playSong = songs.find((val) => val.isplaying === 1)

  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar />

      {/* Song items */}
      <div className="flex flex-col gap-3 px-4 grow overflow-auto">
        {wailistSongs.map((data, idx) => (
          <SongItem key={idx} song={data} number={idx + 1} />
        ))}

        {/* Space */}
        <div className="h-20 flex-shrink-0" />
      </div>

      {/* Control */}
      <div className="flex flex-col relative">
        <AddButton />
        {playSong && <CurrentPlayItem song={playSong} />}
      </div>
    </React.Fragment>
  )
}
