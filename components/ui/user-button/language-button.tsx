"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"

import { Icons } from "../icons"

type Props = {
  setOpenMainMenu: (value: boolean) => void
  setOpenMenuLanguage: (value: boolean) => void
  t: (key: string, params?: Record<string, string>) => string
}

function LanguageButton({ setOpenMainMenu, setOpenMenuLanguage, t }: Props) {
  const locale = useLocale()

  return (
    <div
      className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
      onClick={() => {
        setOpenMainMenu(false)
        setOpenMenuLanguage(true)
      }}
    >
      <div className="flex items-center justify-center px-3">
        <Icons.Language className="size-5" />
      </div>
      <div className="flex flex-1 items-center">
        <div className="flex flex-1 items-center">
          {t("Language")}: {t(locale === "vi" ? "Vietnamese" : "English")}
        </div>
        <ChevronRight className="ml-2" />
      </div>
    </div>
  )
}

export default LanguageButton
