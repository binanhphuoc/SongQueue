"use server"
import { z } from "zod"
import { db } from "@/app/_services/Database"

const createSongSchema = z.object({
  performers: z.string(),
  songname: z.string(),
  relationship: z.string(),
  singer: z.string(),
  tableno: z.number(),
  isplaying: z.number().default(0),
  youtubelink: z.string(),
  createdDate: z.date(),
})
export async function addSong(
  prevSate: string | undefined,
  formData: FormData
) {
  const songData = createSongSchema.parse(formData)
  songData.createdDate = new Date()
  try {
    const song = await db.song.create({
      data: songData,
    })
    return song
  } catch (e) {
    return Error("Failed to Create Song")
  }
}

export async function fetchSongs() {
  try {
    const songs = await db.song.findMany({
      where: {
        isplaying: 0,
      },
      orderBy: [
        {
          createdDate: "asc",
        },
      ],
    })
    return songs
  } catch (e) {
    return Error("Failed to fetch songs")
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
