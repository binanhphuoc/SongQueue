"use client"

import { Song } from "@prisma/client"
import React, { useEffect } from "react"
import { revalidateSongs } from "../_actions/song"
import SongItem from "./SongItem"
import AddButton from "./AddButton/AddButton"
import CurrentPlayItem from "./CurrentPlayItem"

type Props = {
  songs: Song[]
}

export default function MainContent(props: Props) {
  const songs = props.songs
  const wailistSongs = songs.filter((val) => val.isplaying === 0)
  const playSong = songs.find((val) => val.isplaying === 1)

  useEffect(() => {
    const interval = window.setInterval(() => {
      revalidateSongs()
    }, 5 * 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  return (
    <React.Fragment>
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
