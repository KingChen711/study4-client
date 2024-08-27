import React from "react"

import { Badge } from "../ui/badge"

type Props = {
  tagId: string
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
TagBadges
