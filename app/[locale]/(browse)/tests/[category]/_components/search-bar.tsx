"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useOverlay } from "@/stores/use-overlay"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  initTerm: string
}

function SearchBar({ initTerm }: Props) {
  const t = useTranslations("TestsPage")
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const { hide, show } = useOverlay()

  const currentTerm = searchParams.get("term") || ""
  const [searchTerm, setSearchTerm] = useState(initTerm)

  useEffect(() => {
    hide()
  }, [currentTerm, hide])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (currentTerm !== searchTerm) {
      router.push(`${pathName}?term=${searchTerm}`)
      show()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-4">
      <div className="flex flex-1 items-center rounded-lg border-2 px-2">
        <Search className="size-6" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder={t("Searchbar.Placeholder")}
        />
      </div>
      <Button type="submit">{t("Searchbar.Search")}</Button>
    </form>
  )
}

export default SearchBar
