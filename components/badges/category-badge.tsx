import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Badge } from "../ui/badge"

type Props = {
  title: string
  active: boolean
  value: string
}

function CategoryBadges({ title, active, value }: Props) {
  return (
    <Link href={`/tests/${value}`}>
      <Badge
        variant="outline"
        className={cn(
          "select-none border-b-4 bg-green-100 px-4 py-1 text-base text-primary",
          !active &&
            "cursor-pointer select-auto border-2 border-b-4 bg-transparent font-normal text-foreground hover:bg-green-100 active:border-b-2"
        )}
      >
        {title}
      </Badge>
    </Link>
  )
}

export default CategoryBadges
CategoryBadges
