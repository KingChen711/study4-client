import React from "react"

import { Badge } from "../ui/badge"
import { Icons } from "../ui/icons"
import { Skeleton } from "../ui/skeleton"

type Props = {
  tagName: string
  showX?: boolean
  onClick?: () => void
}

function TagBadges({ tagName, onClick, showX = false }: Props) {
  return (
    <Badge variant="outline" className="bg-primary/10 text-primary">
      #{tagName}
      {showX && (
        <Icons.X onClick={onClick} className="ml-2 size-3 cursor-pointer" />
      )}
    </Badge>
  )
}

export default TagBadges

export function TagBadgesSkeleton() {
  return <Skeleton className="h-[22px] w-32" />
}
