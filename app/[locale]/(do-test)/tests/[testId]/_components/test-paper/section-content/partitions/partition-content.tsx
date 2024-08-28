import React from "react"

import { cn } from "@/lib/utils"

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
        "col-span-12 rounded-md bg-input p-3 xl:col-span-7",
        (havePassage || isVerticalLayout) && "xl:col-span-12"
      )}
    >
      {partitionDesc}
    </div>
  )
}

export default PartitionContent
