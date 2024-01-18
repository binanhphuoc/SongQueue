"use server"

import { zfd } from "zod-form-data"
import { z } from "zod"
import { revalidateTag } from "next/cache"
import { db } from "@/app/_services/Database"

const songSchema = z.object({
  id: z.coerce.number(),

  performers: z.string(),
  relationship: z.string(),
  tableno: z.coerce.number(),

  songname: z.string(),
  singer: z.string(),
  youtubelink: z.string().optional(),

  isplaying: z.coerce.number().default(0),
  createdDate: z.date(),
})

export async function revalidateSongs() {
  revalidateTag("songs")
}

export async function addSong(formData: FormData) {
  const createSongSchema = songSchema.pick({
    performers: true,
    relationship: true,
    tableno: true,

    songname: true,
    singer: true,
    youtubelink: true,
  })

  const formDataSchema = zfd.formData(createSongSchema)
  const songData = formDataSchema.parse(formData)

  try {
    const song = await db.song.create({
      data: { ...songData },
    })
    revalidateSongs()
    return song
  } catch (e) {
    return Error("Failed to create song")
  }
}

export async function deleteSong(id: number) {
  try {
    const deletedSong = await db.song.delete({
      where: {
        id: id,
      },
    })
    return deletedSong
  } catch (e) {
    return Error("Failed to delete song")
  }
}
