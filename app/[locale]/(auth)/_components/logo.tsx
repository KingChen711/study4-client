import React from "react"
import { Poppins } from "next/font/google"
import Image from "next/image"

import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

function Logo() {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Image
        // className="invert dark:invert-0"
        src="/logo.jpg"
        alt="twitch"
        className="rounded-full"
        height={80}
        width={80}
      />

      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">
          Prep4<strong className="text-primary">IELTS</strong>
        </p>
      </div>
    </div>
  )
}

export default Logo
