import Image from "next/image"
import { Song } from "@prisma/client"
import { useSession } from "next-auth/react"
import React, { useState } from "react"
import { Drawer } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import PlayingButton from "@/public/playing-button.png"
import SkipButton from "@/public/skip.png"
import { playNextSong } from "../_actions/song"
import GetSongs from "../_clientqueries/get-songs"
import SongForm from "./AddButton/SongForm"

type Props = {
  song: Song
}

export default function CurrentPlayItem(props: Props) {
  const session = useSession()
  const user = session.data?.user

  const queryClient = useQueryClient()

  const [drawer, toggleDrawer] = useState(false)

  const handlePlayNext = () => {
    playNextSong()
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
        className="flex gap-2 rounded-t-xl bg-[rgba(255,255,255,0.85)] text-black px-4 py-2 items-center cursor-pointer"
        onClick={() => {
          toggleDrawer(true)
        }}
      >
        <div className="flex flex-col gap-1 grow">
          <div className="text-sm font-medium text-[#FF0E9F] flex items-center gap-1 -ml-1">
            <Image
              src={PlayingButton.src}
              height={PlayingButton.height}
              width={PlayingButton.width}
              alt="Playing Button"
              className="w-6 h-6 object-cover"
            />
            <p>Currently playing</p>
          </div>

          <p className="text-lg font-bold text-wrap overflow-hidden text-ellipsis">
            {props.song.songname}
          </p>

          <p className="text-[#555] text-wrap overflow-hidden text-ellipsis">
            {props.song.performers}
          </p>
        </div>

        {user && (
          <div className="cursor-pointer hover:bg-slate-200 transition rounded-full p-1">
            <Image
              src={SkipButton.src}
              height={SkipButton.height}
              width={SkipButton.width}
              alt="Skip Button"
              className="w-10 h-10 object-cover "
              onClick={(e) => {
                e.stopPropagation()
                handlePlayNext()
              }}
            />
          </div>
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
