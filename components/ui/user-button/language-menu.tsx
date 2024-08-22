import { useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Check } from "lucide-react"
import { useLocale } from "next-intl"

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = useLocale()
  const [pending, startTransition] = useTransition()

  const switchLanguage = (locale: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      const newPath = `/${locale}${pathname.replace(`/${currentLocale}`, "")}`
      router.push(`${newPath}?${params.toString()}`)
    })
  }

  const backToMainMenu = () => {
    setOpenMenuLanguage(false)
    setOpen(true)
  }

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
          onClick={backToMainMenu}
        >
          <ArrowLeft />
        </Button>
        <h3>{t("SelectLanguage")}</h3>
      </div>

      <Separator />

      <div className="flex flex-col">
        <div
          onClick={() => switchLanguage("vi")}
          className="flex items-center gap-x-2 px-5 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
        >
          <Check
            className={cn(
              currentLocale !== "vi" && "hidden",
              currentLocale === "vi" && pending && "invisible block"
            )}
          />
          <Icons.Loader
            className={cn(
              "size-6",
              currentLocale !== "vi" ? "invisible" : "hidden",
              currentLocale !== "vi" && pending && "visible block"
            )}
          />
          {t("Vietnamese")}
          <Icons.VietNam className="size-5" />
        </div>
        <div
          onClick={() => switchLanguage("en")}
          className="flex items-center gap-x-2 px-5 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
        >
          <Check
            className={cn(
              currentLocale !== "en" && "hidden",
              currentLocale === "en" && pending && "invisible block"
            )}
          />
          <Icons.Loader
            className={cn(
              "size-6",
              currentLocale !== "en" ? "invisible" : "hidden",
              currentLocale !== "en" && pending && "visible block"
            )}
          />
          {t("English")}
          <Icons.UnitedStates className="size-5" />
        </div>
      </div>
    </Card>
  )
}
