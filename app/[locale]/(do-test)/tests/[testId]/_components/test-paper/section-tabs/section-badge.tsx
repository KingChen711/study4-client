import React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Props = {
  active: boolean
  title: string
  sectionId: number
  onClickSection: (sectionId: number) => void
}

function SectionBadge({ title, sectionId, active, onClickSection }: Props) {
  return (
    <Badge
      variant="secondary"
      onClick={() => {
        onClickSection(sectionId)
      }}
      className={cn(
        "cursor-pointer px-4 py-1 text-base font-normal",
        active &&
          "pointer-events-none select-none bg-primary/10 font-bold text-primary"
      )}
    >
      {title}
    </Badge>
  )
}

export default SectionBadge
