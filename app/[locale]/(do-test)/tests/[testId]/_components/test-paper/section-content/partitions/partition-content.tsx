import React from "react"

import { cn } from "@/lib/utils"
import ParseHtml from "@/components/ui/parse-html"

type Props = {
  havePassage: boolean
  isVerticalLayout: boolean
  partitionDesc: string
}

function PartitionContent({
  havePassage,
  isVerticalLayout,
  partitionDesc,
}: Props) {
  return (
    <div
      className={cn(
        "col-span-12 rounded-2xl p-4 xl:col-span-7",
        (havePassage || isVerticalLayout) && "xl:col-span-12",
        !isVerticalLayout && "bg-card"
      )}
    >
      <ParseHtml data={partitionDesc} />
    </div>
  )
}

export default PartitionContent
