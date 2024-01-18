"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Welcome from "@/public/welcome.png"
import BgImage from "@/public/bg-image.jpeg"
import "./globals.css"
import React from "react"

export default function Motion({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl w-full h-screen bg-red relative">
      {/* Background image */}
      <Image
        src={BgImage.src}
        height={BgImage.height}
        width={BgImage.width}
        alt="Background Image"
        className="w-full h-full object-cover absolute top-0 z-0"
      />
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7 }}
        className="w-full h-full absolute top-0 backdrop-blur-sm z-10"
      />

      {/* Content */}
      <main className="flex flex-col relative z-20 h-full">
        <div className="min-h-fit grow flex-shrink-0 flex flex-col items-center gap-6 overflow-auto py-12">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-1 mb-8"
          >
            <Image
              src={Welcome.src}
              height={Welcome.height}
              width={Welcome.width}
              alt="Welcome"
              className="w-[280px] h-auto object-cover"
            />

            <p className="text-sm text-[rgba(0,0,0,0.70)]">TO OUR WEDDING</p>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col text-[rgba(0,0,0,0.70)]"
          >
            <h1 className="text-4xl font-bold text-wrap text-center leading-normal font-['Playfair_Display']">
              Tiến Nguyễn
            </h1>

            <h1 className="text-2xl font-bold text-wrap text-center leading-normal font-['Playfair_Display']">
              &
            </h1>

            <h1 className="text-4xl font-bold text-wrap text-center leading-normal font-['Playfair_Display']">
              Nhi Nguyễn
            </h1>
          </motion.div>
        </div>
        {children}
      </main>
    </div>
  )
}
