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
        "col-span-12 rounded-md bg-neutral-100 p-3 xl:col-span-6",
        !readingDesc && "hidden"
      )}
    >
      <ParseHtml data={readingDesc} />
    </div>
  )
}

export default Passage
