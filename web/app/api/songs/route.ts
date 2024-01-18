import { db } from "@/app/_services/Database"

export async function GET(_request: Request) {
  try {
    const songs = await db.song.findMany({
      orderBy: [
        {
          createdDate: "asc",
        },
      ],
    })
    return Response.json({ songs })
  } catch (e) {
    return Error("Failed to fetch songs")
  }
}
