import React from "react"

import Navbar from "./_components/Navbar"
import MainContent from "./_components/MainContent"

export default async function Home() {
  return (
    <React.Fragment>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <MainContent />
    </React.Fragment>
  )
}
