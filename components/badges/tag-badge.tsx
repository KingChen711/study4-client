import React from "react"

import { Badge } from "../ui/badge"

type Props = {
  title: string
}

function TagBadges({ title }: Props) {
  return (
    <Badge variant="outline" className="bg-green-50 text-primary">
      #{title}
    </Badge>
  )
}

export default TagBadges
TagBadges
