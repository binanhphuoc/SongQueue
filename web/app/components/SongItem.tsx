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
      <div className="rounded-full bg-black text-white text-sm w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">
        {props.number}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 text-sm text-black w-full overflow-hidden">
        <p className="text-lg font-bold text-wrap overflow-hidden text-ellipsis">
          {props.name}
        </p>

        <p className="text-[#555] text-wrap overflow-hidden text-ellipsis">
          {props.singers.join(", ")}
        </p>
      </div>
    </div>
  )
}
