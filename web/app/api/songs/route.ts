import { db } from "@/app/_services/Database"

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const dynamic = "force-dynamic"

export async function GET(_request: Request) {
  const songs = await db.song.findMany({
    orderBy: [
      {
        createdDate: "asc",
      },
    ],
  })
  return Response.json({ songs })
}
