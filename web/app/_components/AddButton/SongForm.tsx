"use client"

import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { Song } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { addSong } from "@/app/_actions/song"
import GetSongs from "@/app/_clientqueries/get-songs"
import SongFormField from "./SongFormField"

type Props = {
  mode: "create" | "update" | "view"
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
  song?: Song
}

export default function SongForm(props: Props) {
  const [err, setErr] = useState("")
  const queryClient = useQueryClient()

  const handleAction = async (formData: FormData) => {
    // const entries = formData.entries()
    // let result = entries.next()
    // while (!result.done) {
    //   console.log(result.value)
    //   result = entries.next()
    // }

    if (props.mode === "view") {
      return
    }

    addSong(formData)
      .then(async () => {
        await queryClient.invalidateQueries({
          queryKey: GetSongs.queryKey,
          exact: true,
        })
        props.toggleDrawer(false)
      })
      .catch((err: Error) => {
        if (err.message) {
          setErr(err.message)
        }
      })
  }

  return (
    <form
      className="max-w-3xl w-full h-screen overflow-auto rounded-t-2xl bg-white"
      action={handleAction}
    >
      {/* Snackbar */}
      <Snackbar
        open={err.length !== 0}
        onClose={(event, reason) => {
          setErr("")
        }}
        autoHideDuration={5000}
      >
        <Alert
          severity="error"
          onClose={() => {
            setErr("")
          }}
        >
          {err}
        </Alert>
      </Snackbar>

      {/* Header */}
      <div className="sticky top-0 bg-white flex gap-2 justify-between items-center flex-wrap p-4">
        <p
          className="text-sm font-medium cursor-pointer"
          onClick={() => {
            props.toggleDrawer(false)
          }}
        >
          {props.mode === "view" ? "Close" : "Cancel"}
        </p>

        <h1 className="text-lg font-bold">
          {props.mode === "view" ? "Song Details" : "Add Song"}
        </h1>

        {props.mode !== "view" && (
          <button
            type="submit"
            className="text-sm text-[#FF0E9F] font-medium cursor-pointer"
          >
            Submit
          </button>
        )}

        {/* Placeholder for justify between */}
        {props.mode === "view" && <div className="w-[38px] h-[20px]" />}
      </div>

      {/* Note */}
      {props.mode === "create" && (
        <div className="p-3">
          <div className="flex gap-2 p-4 items-center bg-[#EBEBEB] rounded-xl">
            <p className="text-4xl">💡</p>
            <p className="font-medium text-[#555]">
              Song information cannot be updated after submitting. Please
              contact host to update if you need to.
            </p>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="p-4 flex flex-col gap-8 mb-16">
        <SongFormField
          id="performers"
          label="Performer(s)"
          placeholder="e.g. Johnny, Hanna"
          required
          disabled={props.mode === "view"}
          value={props.song?.performers}
        />

        <SongFormField
          id="relationship"
          label="Relationship"
          placeholder="e.g. Friend"
          required
          disabled={props.mode === "view"}
          value={props.song?.relationship}
        />

        <SongFormField
          id="tableno"
          label="Table Number"
          placeholder="e.g. 1"
          type="number"
          required
          disabled={props.mode === "view"}
          value={props.song?.tableno}
        />

        <SongFormField
          id="songname"
          label="Song Name"
          placeholder="e.g. Đám cưới nha?"
          required
          disabled={props.mode === "view"}
          value={props.song?.songname}
        />

        <SongFormField
          id="singer"
          label="Original Singer"
          placeholder="e.g. HỒNG THANH X MIE"
          required
          disabled={props.mode === "view"}
          value={props.song?.singer}
        />

        <SongFormField
          id="youtubelink"
          label="Youtube Link"
          placeholder="e.g. https://youtu.be/sXa8ylsdaE4?si=56oeynged-QHvLYK"
          disabled={props.mode === "view"}
          value={props.song?.youtubelink ?? undefined}
        />
      </div>
    </form>
  )
}
