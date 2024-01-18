"use server"

import { zfd } from "zod-form-data"
import { z } from "zod"
import { Song } from "@prisma/client"
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

export async function playSong(id: number) {
  try {
    const deletedSong = await db.song.deleteMany({
      where: {
        isplaying: 1,
      },
    })

    const newPlaySong = await db.song.update({
      where: { id },
      data: { isplaying: 1 },
    })

    return { deletedSong, newPlaySong }
  } catch (e) {
    return Error("Failed to play song")
  }
}

export async function playNextSong() {
  try {
    const deletedSong = await db.song.deleteMany({
      where: {
        isplaying: 1,
      },
    })

    const queueSongs = await db.song.findMany({
      where: { isplaying: 0 },
      orderBy: [
        {
          createdDate: "asc",
        },
      ],
    })

    let newPlaySong: Song | null = null

    if (queueSongs.length !== 0) {
      const queueTop = queueSongs[0]

      newPlaySong = await db.song.update({
        where: {
          id: queueTop.id,
        },
        data: {
          isplaying: 1,
        },
      })
    }

    return { deletedSong, newPlaySong }
  } catch (e) {
    return Error("Failed to play song")
  }
}

export async function deleteSongInQueue(id: number) {
  try {
    const deletedSong = await db.song.delete({
      where: {
        id: id,
      },
    })

    return { deletedSong }
  } catch (e) {
    return Error("Failed to play song")
  }
}
