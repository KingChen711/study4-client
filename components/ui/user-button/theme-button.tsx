import React from "react"
import { ChevronRight } from "lucide-react"

import { Icons } from "../icons"

type Props = {
  setOpenMainMenu: (value: boolean) => void
  setOpenMenuTheme: (value: boolean) => void
  t: (key: string, params?: Record<string, string>) => string
}

function ThemeButton({ setOpenMainMenu, setOpenMenuTheme, t }: Props) {
  return (
    <div
      className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
      onClick={() => {
        setOpenMainMenu(false)
        setOpenMenuTheme(true)
      }}
    >
      <div className="flex items-center justify-center px-3">
        <Icons.Theme className="size-5" />
      </div>
      <div className="flex flex-1 items-center gap-x-2">
        <div className="flex-1">
          {t("Theme")}: {t("Light")}
        </div>
        <ChevronRight className="ml-2" />
      </div>
    </div>
  )
}

export default ThemeButton
