"use client"

import Image from "next/image"
import { Drawer } from "@mui/material"
import { Song } from "@prisma/client"
import { useState } from "react"
import React from "react"
import { useSession } from "next-auth/react"
import { useQueryClient } from "@tanstack/react-query"
import PlayButton from "@/public/play-button.png"
import DeleteButton from "@/public/delete-button.png"
import { playSong, deleteSongInQueue } from "../_actions/song"
import GetSongs from "../_clientqueries/get-songs"
import SongForm from "./AddButton/SongForm"

type Props = {
  number: number
  song: Song
}

export default function SongItem(props: Props) {
  const session = useSession()
  const user = session.data?.user

  const queryClient = useQueryClient()

  const [drawer, toggleDrawer] = useState(false)

  const handlePlay = () => {
    playSong(props.song.id)
      .then(async () => {
        await queryClient.invalidateQueries({
          queryKey: GetSongs.queryKey,
          exact: true,
        })
      })
      .catch((err) => {
        console.error("Error", err)
      })
  }

  const handleDeleteSong = () => {
    deleteSongInQueue(props.song.id)
      .then(async () => {
        await queryClient.invalidateQueries({
          queryKey: GetSongs.queryKey,
          exact: true,
        })
      })
      .catch((err) => {
        console.error("Error", err)
      })
  }

  return (
    <React.Fragment>
      <div
        className="flex flex-row items-center gap-2.5 bg-[rgba(255,255,255,0.85)] rounded-xl px-[15px] py-[10px] cursor-pointer"
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

        {/* Delete Button */}
        {user && (
          <Image
            src={DeleteButton.src}
            height={DeleteButton.height}
            width={DeleteButton.width}
            alt="Delete Button"
            className="w-8 h-8 object-cover cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteSong()
            }}
          />
        )}

        {/* Play Button */}
        {user && (
          <Image
            src={PlayButton.src}
            height={PlayButton.height}
            width={PlayButton.width}
            alt="Play Button"
            className="w-8 h-8 object-cover cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handlePlay()
            }}
          />
        )}
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
        <SongForm
          mode={user ? "update" : "view"}
          toggleDrawer={toggleDrawer}
          song={props.song}
        />
      </Drawer>
    </React.Fragment>
  )
}
