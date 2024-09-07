import React from "react"

import { cn } from "@/lib/utils"

import { Badge } from "../ui/badge"
import { Icons } from "../ui/icons"
import { Skeleton } from "../ui/skeleton"

type Props = {
  tagName: string
  showX?: boolean
  disabled?: boolean
  onClick?: () => void
}

function TagBadges({
  tagName,
  onClick,
  showX = false,
  disabled = false,
}: Props) {
  return (
    <Badge variant="outline" className="bg-primary/10 text-primary">
      #{tagName}
      {showX && (
        <Icons.X
          onClick={onClick}
          className={cn(
            "ml-2 size-3 cursor-pointer",
            disabled && "pointer-events-none"
          )}
        />
      )}
    </Badge>
  )
}

export default TagBadges

export function TagBadgesSkeleton() {
  return <Skeleton className="h-[22px] w-32" />
}
