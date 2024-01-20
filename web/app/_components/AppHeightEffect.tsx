"use client"

import { useEffect } from "react"

export default function AppHeightEffect() {
  useEffect(() => {
    // Mobile bug with 100vh: https://dev.to/maciejtrzcinski/100vh-problem-with-ios-safari-3ge9
    getAppHeight()
    window.addEventListener("resize", getAppHeight)

    return () => {
      window.removeEventListener("resize", getAppHeight)
    }
  }, [])

  const getAppHeight = () => {
    const doc = document.documentElement
    console.log(window.innerHeight)
    doc.style.setProperty("--height-app", `${window.innerHeight}px`)
  }

  return null
}
