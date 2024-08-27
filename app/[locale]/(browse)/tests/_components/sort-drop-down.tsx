"use client"

import React, { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { type TestOrderBy } from "@/queries/test/get-tests"
import { useOverlay } from "@/stores/use-overlay"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/ui/icons"

export const sortMap: Record<TestOrderBy, string> = {
  "-createDate": "Newest",
  "-totalEngaged": "Hottest",
} as const

type Props = {
  orderBy: TestOrderBy
}

function SortDropDown({ orderBy }: Props) {
  const router = useRouter()
  const t = useTranslations("TestsPage.SortBar")
  const searchParams = useSearchParams()
  const { hide, show } = useOverlay()

  useEffect(() => {
    hide()
  }, [hide, orderBy])

  function handleSelectSort(orderBy: TestOrderBy) {
    const term = searchParams.get("term") || ""
    const category = searchParams.get("category") || "all"
    show()
    router.push(`/tests?term=${term}&category=${category}&orderBy=${orderBy}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-x-1">
          <Icons.Sort className="size-4" />
          <p>{t("OrderBy")}:</p> <strong>{t(sortMap[orderBy])}</strong>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem
          className={cn(
            "cursor-pointer",
            orderBy === "-createDate" && "font-bold"
          )}
          onClick={() => {
            handleSelectSort("-createDate")
          }}
        >
          {t("Newest")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "cursor-pointer",
            orderBy === "-totalEngaged" && "font-bold"
          )}
          onClick={() => {
            handleSelectSort("-totalEngaged")
          }}
        >
          {t("Hottest")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortDropDown
