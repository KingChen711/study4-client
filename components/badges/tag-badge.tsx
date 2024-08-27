import React from "react"

import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"

type Props = {
  tagName: string
}

function TagBadges({ tagName }: Props) {
  return (
    <Badge variant="outline" className="bg-green-50 text-primary">
      #{tagName}
    </Badge>
  )
}

export default TagBadges

export function TagBadgesSkeleton() {
  return <Skeleton className="h-[22px] w-32" />
}
