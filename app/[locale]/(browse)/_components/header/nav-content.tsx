"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { SheetClose } from "@/components/ui/sheet"

const routes = [
  {
    route: "/",
    tText: "Header.Home",
  },
  {
    route: "/tests",
    tText: "Header.OnlineTests",
  },
  {
    route: "/flashcards",
    tText: "Header.Flashcards",
  },
  {
    route: "/premium",
    tText: "Header.ActivePremium",
  },
] as const

function NavContent() {
  const t = useTranslations("Layout")
  const pathname = usePathname()
  return (
    <section className="flex h-full flex-col gap-y-3 pt-6">
      {routes.map((route) => {
        const isActive =
          (pathname.includes(route.route) && route.route.length > 1) ||
          pathname === route.route

        return (
          <SheetClose key={route.route} asChild>
            <Link
              href={route.route}
              className={cn(
                "flex items-center justify-start gap-4 rounded-xl p-4 px-6 text-muted-foreground",
                isActive && "bg-primary font-bold text-primary-foreground"
              )}
            >
              <p>{t(route.tText)}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}

export default NavContent
