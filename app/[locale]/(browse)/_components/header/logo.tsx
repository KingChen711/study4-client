import React from "react"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

type Props = {
  mobile?: boolean
}

function Logo({ mobile = false }: Props) {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 transition">
        <div className="overflow-hidden rounded-full bg-foreground">
          <Image
            // className="invert dark:invert-0"
            src="/logo.jpg"
            alt="logo"
            width={44}
            height={44}
          />
        </div>

        <div
          className={cn("hidden lg:block", font.className, mobile && "block")}
        >
          <p className="text-lg font-semibold">
            Prep4<strong className="text-primary">IELTS</strong>
          </p>
          <p className="text-xs text-muted-foreground">Let&apos;s learn</p>
        </div>
      </div>
    </Link>
  )
}

export default Logo
