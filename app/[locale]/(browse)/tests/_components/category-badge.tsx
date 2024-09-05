"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOverlay } from "@/stores/use-overlay"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Props = {
  title: string
  active: boolean
  isAllBadge?: boolean
}

function CategoryBadge({ title, active, isAllBadge = false }: Props) {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || "all"
  const router = useRouter()
  const { show, hide } = useOverlay()

  useEffect(() => {
    hide()
  }, [category, hide])

  return (
    <Badge
      onClick={() => {
        if (active) return
        show()
        router.push(`/tests?category=${isAllBadge ? "all" : title}`)
      }}
      variant="outline"
      className={cn(
        "select-none border-b-4 bg-primary/20 px-4 py-1 text-base text-primary",
        !active &&
          "cursor-pointer select-auto border-2 border-b-4 bg-transparent font-normal text-foreground hover:bg-primary/10 active:border-b-2"
      )}
    >
      {title}
    </Badge>
  )
}

export default CategoryBadge
