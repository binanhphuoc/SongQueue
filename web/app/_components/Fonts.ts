import { Inter, Playfair_Display, Playfair_Display_SC } from "next/font/google"

export const inter = Inter({ subsets: ["latin"] })
export const playfair_display = Playfair_Display({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
})
export const playfair_display_sc = Playfair_Display_SC({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
})
