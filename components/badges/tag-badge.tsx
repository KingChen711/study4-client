import React from "react"

import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"

type Props = {
  tagId?: number
  tagName: string
}

function TagBadges({ tagId, tagName }: Props) {
  console.log({ tagId })
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
