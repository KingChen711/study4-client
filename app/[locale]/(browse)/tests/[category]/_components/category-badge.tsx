"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useOverlay } from "@/stores/use-overlay"

import { cn } from "@/lib/utils"

import { Badge } from "../../../../../../components/ui/badge"

type Props = {
  title: string
  active: boolean
  value: string
  setCategory: (value: string) => void
}

function CategoryBadges({ title, active, value, setCategory }: Props) {
  const { category } = useParams<{ category: string }>()
  const router = useRouter()
  const { show, hide } = useOverlay()

  useEffect(() => {
    hide()
  }, [category, hide])

  return (
    <Badge
      onClick={() => {
        show()
        setCategory(value)
        router.push(`/tests/${value}`)
      }}
      variant="outline"
      className={cn(
        "select-none border-b-4 bg-green-100 px-4 py-1 text-base text-primary",
        !active &&
          "cursor-pointer select-auto border-2 border-b-4 bg-transparent font-normal text-foreground hover:bg-green-100 active:border-b-2"
      )}
    >
      {title}
    </Badge>
  )
}

export default CategoryBadges
CategoryBadges
