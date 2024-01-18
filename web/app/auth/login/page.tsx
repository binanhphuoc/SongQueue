import Image from "next/image"
import Welcome from "@/public/welcome.png"
import { playfair_display, playfair_display_sc } from "@/app/_components/Fonts"
import LoginForm from "./_components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-fit grow flex-shrink-0 flex flex-col items-center gap-6 overflow-auto py-12">
      {/* Welcome */}
      <div className="flex flex-col items-center gap-1 mb-8">
        <Image
          src={Welcome.src}
          height={Welcome.height}
          width={Welcome.width}
          alt="Welcome"
          className="w-[280px] h-auto object-cover"
        />

        <p
          className={`${playfair_display_sc.className} font-normal text-sm text-[rgba(0,0,0,0.70)]`}
        >
          TO OUR WEDDING
        </p>
      </div>

      {/* Title */}
      <div className="flex flex-col text-[rgba(0,0,0,0.70)]">
        <h1
          className={`${playfair_display_sc.className} text-4xl font-bold text-wrap text-center leading-normal font-['Playfair_Display']`}
        >
          Tiến Nguyễn
        </h1>

        <h1
          className={`${playfair_display.className} text-2xl font-normal text-wrap text-center leading-normal font-['Playfair_Display']`}
        >
          &
        </h1>

        <h1
          className={`${playfair_display_sc.className} text-4xl font-bold text-wrap text-center leading-normal font-['Playfair_Display']`}
        >
          Nhi Nguyễn
        </h1>
      </div>

      <LoginForm />
    </div>
  )
}
