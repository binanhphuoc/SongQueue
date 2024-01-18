"use client"

import { Drawer } from "@mui/material"
import { Song } from "@prisma/client"
import { useState } from "react"
import React from "react"
import SongForm from "./AddButton/SongForm"

type Props = {
  number: number
  song: Song
}

export default function SongItem(props: Props) {
  const [drawer, toggleDrawer] = useState(false)

  return (
    <React.Fragment>
      <div
        className="flex flex-row items-center gap-2.5 bg-[rgba(255,255,255,0.70)] rounded-xl px-[15px] py-[10px] cursor-pointer"
        onClick={() => {
          toggleDrawer(true)
        }}
      >
        {/* Number */}
        <div className="rounded-full bg-black text-white text-sm w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">
          {props.number}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 text-sm text-black w-full overflow-hidden">
          <p className="text-lg font-bold text-wrap overflow-hidden text-ellipsis">
            {props.song.songname}
          </p>

          <p className="text-[#555] text-wrap overflow-hidden text-ellipsis">
            {props.song.performers}
          </p>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        anchor={"bottom"}
        open={drawer}
        onClose={() => toggleDrawer(false)}
        classes={{
          paper: "!bg-transparent flex items-center h-fit",
        }}
      >
        <SongForm mode="view" toggleDrawer={toggleDrawer} song={props.song} />
      </Drawer>
    </React.Fragment>
  )
}
