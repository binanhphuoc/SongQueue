"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Drawer } from "@mui/material"
import AddIcon from "@/public/add-icon.png"
import Bike from "@/public/bike.png"
import GetSongs from "../_clientqueries/get-songs"
import SongItem from "./SongItem"
import AddButton from "./AddButton/AddButton"
import CurrentPlayItem from "./CurrentPlayItem"
import SongForm from "./AddButton/SongForm"

export default function MainContent() {
  const songsData = GetSongs.useQueryWrapper()
  const wailistSongs =
    songsData.data?.songs.filter((val) => val.isplaying === 0) ?? []
  const playSong = songsData.data?.songs.find((val) => val.isplaying === 1)

  const [drawer, toggleDrawer] = useState(false)

  return (
    <React.Fragment>
      {/* Song items */}
      {wailistSongs.length !== 0 && (
        <div className="flex flex-col gap-3 px-4 grow overflow-auto">
          {wailistSongs.map((data, idx) => (
            <SongItem key={idx} song={data} number={idx + 1} />
          ))}

          {/* Space */}
          <div className="h-20 flex-shrink-0" />
        </div>
      )}

      {/* Empty */}
      {wailistSongs.length === 0 && (
        <React.Fragment>
          <div className="grow overflow-auto p-4">
            <div className="flex flex-col justify-center items-center gap-3 p-4 bg-[rgba(255,255,255,0.85)] rounded-lg text-black">
              <Image
                src={Bike.src}
                height={Bike.height}
                width={Bike.width}
                alt="Bike"
                className="w-36 h-36 object-cover"
              />

              <p className="font-bold text-xl">It looks empty here...</p>

              <p className="text-[#555] text-wrap text-center text-sm">
                We welcome all musical talents to our wedding stage to share the
                joy with us!
              </p>

              <div
                className="bg-[#FF4CB8] text-white px-3 py-2 rounded-xl flex items-center mt-2 cursor-pointer"
                onClick={() => {
                  toggleDrawer(true)
                }}
              >
                <Image
                  src={AddIcon.src}
                  height={AddIcon.height}
                  width={AddIcon.width}
                  alt="Add Icon"
                  className="w-8 h-8 object-cover"
                />
                <p className="text-sm font-medium">Add song</p>
              </div>
            </div>
          </div>

          <Drawer
            anchor={"bottom"}
            open={drawer}
            onClose={() => toggleDrawer(false)}
            classes={{
              paper: "!bg-transparent flex items-center h-fit",
            }}
          >
            <SongForm mode="create" toggleDrawer={toggleDrawer} />
          </Drawer>
        </React.Fragment>
      )}

      {/* Control */}
      <div className="flex flex-col relative">
        <AddButton />
        {playSong && <CurrentPlayItem song={playSong} />}
      </div>
    </React.Fragment>
  )
}
