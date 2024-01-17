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
  createdDate: z.date(),
})
export async function createSongData(formData: FormData) {
  const songData = createSongSchema.parse(formData)
  songData.createdDate = new Date()
  try {
    const song = await db.song.create({
      songData,
    })
    return song
  } catch (e) {
    return Error("Failed to Create Song")
  }
}
