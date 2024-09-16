import React from "react"

import { cn } from "@/lib/utils"

import ParseHtml from "./parse-html"

type Props = {
  readingDesc: string | null
}

function Passage({ readingDesc }: Props) {
  if (!readingDesc) return null

  return (
    <div
      className={cn(
        "col-span-12 rounded-md border-2 p-3 xl:col-span-7",
        !readingDesc && "hidden"
      )}
    >
      <ParseHtml data={readingDesc} />
    </div>
  )
}

export default Passage
