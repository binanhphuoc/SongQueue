"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Welcome from "@/public/welcome.png"
import BgImage from "@/public/bg-image.jpeg"
import "../globals.css"
import React, { useState } from "react"

const INTRO_STAY_STILL_DURATION_SEC = 0.5

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode
}) {
  const [didCompleteIntroAnimation, setCompleteIntroAnimation] = useState(false)

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
        transition={{
          duration: 0.7,
          delay: 2.4 + INTRO_STAY_STILL_DURATION_SEC,
        }}
        className="w-full h-full absolute top-0 backdrop-blur-sm z-10"
      />

      {/* Content */}
      <main className="flex flex-col relative z-20 h-full">
        {!didCompleteIntroAnimation && (
          <div className="min-h-fit grow flex-shrink-0 flex flex-col items-center gap-6 overflow-auto py-12">
            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0 }}
              transition={{
                // total duration is 2.4 sec
                duration: 2.4,
                // On that span of 2.4 sec, 4 keyframes at sec 0, 0.7, 1.7, and 2.4
                times: [
                  0,
                  0.7 / 2.4,
                  (1.4 + INTRO_STAY_STILL_DURATION_SEC) / 2.4,
                  1,
                ],
              }}
              // At each keyframe, opacity should has value of
              animate={{ opacity: [0, 1, 1, 0] }}
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
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.7,
                times: [
                  0,
                  0.7 / 1.7,
                  (0.7 + INTRO_STAY_STILL_DURATION_SEC) / 1.7,
                  1,
                ],
                delay: 0.7,
              }}
              onAnimationComplete={() => setCompleteIntroAnimation(true)}
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
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 2.4 + INTRO_STAY_STILL_DURATION_SEC,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
