type Props = {
  number: number
  name: string
  singers: string[]
  tableNumber: string
}

export default function SongItem(props: Props) {
  return (
    <div className="flex flex-row items-center gap-2.5 bg-[rgba(255,255,255,0.70)] rounded-xl px-[15px] py-[10px]">
      {/* Number */}
      <div className="rounded-full bg-black text-white text-sm w-6 h-6 flex items-center justify-center font-bold">
        {props.number}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 text-sm text-black">
        <p className="font-bold">{props.name}</p>
        <p className="text-[#555]">{props.singers.join(", ")}</p>
      </div>
    </div>
  )
}
