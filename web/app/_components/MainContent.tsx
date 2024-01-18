"use client"

import React from "react"
import GetSongs from "../_clientqueries/get-songs"
import SongItem from "./SongItem"
import AddButton from "./AddButton/AddButton"
import CurrentPlayItem from "./CurrentPlayItem"

export default function MainContent() {
  const songsData = GetSongs.useQueryWrapper()
  const wailistSongs =
    songsData.data?.songs.filter((val) => val.isplaying === 0) ?? []
  const playSong = songsData.data?.songs.find((val) => val.isplaying === 1)

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
