import React from "react"

import { Badge } from "../ui/badge"

type Props = {
  title: string
}

function TagBadges({ title }: Props) {
  return (
    <Badge variant="outline" className="bg-blue-50 text-blue-700">
      #{title}
    </Badge>
  )
}

export default TagBadges
TagBadges
