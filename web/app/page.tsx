import Image from "next/image"
import BgImage from "@/public/bg-image.jpeg"
import SongItem from "./components/SongItem"

export default function Home() {
  const test = [
    { number: 1, name: "Test", singers: ["Tu", "Bin"], tableNumber: "1" },
    { number: 1, name: "Test", singers: ["Tu", "Bin"], tableNumber: "1" },
    { number: 1, name: "Test", singers: ["Tu", "Bin"], tableNumber: "1" },
    { number: 1, name: "Test", singers: ["Tu", "Bin"], tableNumber: "1" },
  ]

  return (
    <div className="min-h-screen min-w-screen bg-black flex justify-center">
      {/* Container */}
      <div className="max-w-3xl w-full h-screen bg-red relative">
        {/* Background image */}
        <Image
          src={BgImage.src}
          height={BgImage.height}
          width={BgImage.width}
          alt="People Smiling"
          className="w-full h-full object-cover absolute top-0 z-0"
        />

        {/* Overlay */}
        <div className="w-full h-full absolute top-0 backdrop-blur-sm z-10" />

        {/* Content */}
        <div className="flex flex-col relative z-20">
          <h1 className="text-4xl text-white font-extrabold w-full p-4 mb-3">
            Up next
          </h1>

          {/* Song items */}
          <div className="flex flex-col gap-3 px-4">
            {test.map((data, idx) => (
              <SongItem key={idx} {...data} number={idx + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
