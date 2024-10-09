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
        "col-span-12 overflow-y-auto rounded-2xl bg-card p-4 xl:col-span-6",
        !readingDesc && "hidden"
      )}
    >
      <ParseHtml data={readingDesc} />
    </div>
  )
}

export default Passage
