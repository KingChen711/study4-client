import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  readingDesc: string | null
}

function Passage({ readingDesc }: Props) {
  return (
    <div
      className={cn(
        "col-span-12 h-80 bg-yellow-500 xl:col-span-7",
        !readingDesc && "hidden"
      )}
    ></div>
  )
}

export default Passage
