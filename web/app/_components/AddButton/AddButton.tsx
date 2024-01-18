"use client"

import Image from "next/image"
import React, { useState } from "react"
import { Drawer } from "@mui/material"
import AddButtonImage from "@/public/add-button.png"
import SongForm from "./SongForm"

export default function AddButton() {
  const [drawer, toggleDrawer] = useState(false)

  return (
    <React.Fragment>
      <div
        className="flex justify-end py-2 px-4 absolute -top-20 w-full cursor-pointer"
        onClick={() => {
          toggleDrawer(true)
        }}
      >
        <Image
          src={AddButtonImage.src}
          height={AddButtonImage.height}
          width={AddButtonImage.width}
          alt="Add Button"
          className="w-16 h-16 object-cover"
        />
      </div>

      <Drawer
        anchor={"bottom"}
        open={drawer}
        onClose={() => toggleDrawer(false)}
        classes={{
          paper: "!bg-transparent flex items-center h-fit",
        }}
      >
        <SongForm mode="create" toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  )
}
