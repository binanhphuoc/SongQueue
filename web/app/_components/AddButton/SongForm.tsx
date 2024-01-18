"use client"

import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { revalidateTag } from "next/cache"
import { addSong } from "@/app/_actions/song"
import SongFormField from "./SongFormField"

type Props = {
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SongForm(props: Props) {
  const [err, setErr] = useState("")

  const handleAction = async (formData: FormData) => {
    // const entries = formData.entries()
    // let result = entries.next()
    // while (!result.done) {
    //   console.log(result.value)
    //   result = entries.next()
    // }

    addSong(formData)
      .then(() => {
        revalidateTag("songs")
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
          Cancel
        </p>

        <h1 className="text-lg font-bold">Add Song</h1>

        <button
          type="submit"
          className="text-sm text-[#FF0E9F] font-medium cursor-pointer"
        >
          Submit
        </button>
      </div>

      {/* Note */}
      <div className="p-3">
        <div className="flex gap-2 p-4 items-center bg-[#EBEBEB] rounded-xl">
          <p className="text-4xl">💡</p>
          <p className="font-medium text-[#555]">
            Song information cannot be updated after submitting. Please contact
            host to update if you need to.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-4 flex flex-col gap-8 mb-16">
        <SongFormField
          id="performers"
          label="Performer(s)"
          placeholder="e.g. Johnny, Hanna"
          required
        />

        <SongFormField
          id="relationship"
          label="Relationship"
          placeholder="e.g. Friend"
          required
        />

        <SongFormField
          id="tableno"
          label="Table Number"
          placeholder="e.g. 1"
          type="number"
          required
        />

        <SongFormField
          id="songname"
          label="Song Name"
          placeholder="e.g. Đám cưới nha?"
          required
        />

        <SongFormField
          id="singer"
          label="Original Singer"
          placeholder="e.g. HỒNG THANH X MIE"
          required
        />

        <SongFormField
          id="youtubelink"
          label="Youtube Link"
          placeholder="e.g. https://youtu.be/sXa8ylsdaE4?si=56oeynged-QHvLYK"
        />
      </div>
    </form>
  )
}
