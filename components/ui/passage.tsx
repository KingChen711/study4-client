import React from "react"

import { cn } from "@/lib/utils"

import ParseHtml from "./parse-html"

type Props = {
  readingDesc: string | null
  doTestLayout?: boolean
}

function Passage({ readingDesc, doTestLayout = false }: Props) {
  if (!readingDesc) return null

  return (
    <div
      className={cn(
        "col-span-12 overflow-y-auto rounded-2xl bg-card p-4 xl:col-span-6",
        !readingDesc && "hidden",
        doTestLayout && "xl:max-h-full xl:overflow-y-auto"
      )}
    >
      <ParseHtml data={readingDesc} />
    </div>
  )
}

export default Passage
