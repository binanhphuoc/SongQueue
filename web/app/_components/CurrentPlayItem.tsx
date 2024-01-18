import Image from "next/image"
import { Song } from "@prisma/client"
import PlayingButton from "@/public/playing-button.png"

type Props = {
  song: Song
}

export default function CurrentPlayItem(props: Props) {
  return (
    <div className="flex flex-col gap-1 rounded-t-xl bg-[rgba(255,255,255,0.90)] text-black px-4 py-2">
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
  )
}
