import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "../button"
import { Card } from "../card"
import { Icons } from "../icons"
import { Separator } from "../separator"

type Props = {
  openMenuLanguage: boolean
  setOpenMenuLanguage: (value: boolean) => void
  setOpen: (value: boolean) => void
  t: (key: string, params?: Record<string, string>) => string
}

export function LanguageMenu({
  setOpen,
  setOpenMenuLanguage,
  openMenuLanguage,
  t,
}: Props) {
  return (
    <Card
      style={{
        top: "calc(100% + 10px)",
      }}
      className={cn(
        "absolute -right-2 hidden w-[270px] flex-col rounded-2xl bg-card py-3 shadow-md",
        openMenuLanguage && "flex"
      )}
    >
      <div className="flex items-center gap-x-1 px-2">
        <Button
          size="icon"
          className="rounded-full"
          variant="ghost"
          onClick={() => {
            setOpenMenuLanguage(false)
            setOpen(true)
          }}
        >
          <ArrowLeft />
        </Button>
        <h3>{t("SelectLanguage")}</h3>
      </div>

      <Separator />

      <div className="flex flex-col">
        <div className="flex items-center gap-x-2 px-8 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted">
          {t("Vietnamese")}
          <Icons.VietNam className="size-5" />
        </div>
        <div className="flex items-center gap-x-2 px-8 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted">
          {t("English")}
          <Icons.UnitedStates className="size-5" />
        </div>
      </div>
    </Card>
  )
}
