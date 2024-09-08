"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { staffRoutes } from "@/constants/routes"

import { cn } from "@/lib/utils"

function LeftSidebar() {
  const pathname = usePathname()

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r pr-9 pt-24 dark:shadow-none max-lg:px-6 max-sm:hidden lg:w-[300px]">
      <div className="flex flex-col">
        {staffRoutes.map(({ Icon, label, route }) => {
          const isActive =
            (pathname.slice(3).startsWith(route) && route !== "/staff") ||
            (pathname.slice(3) === "/staff" && route === "/staff")

          return (
            <Link
              key={route}
              href={route}
              className={cn(
                "flex items-center justify-start gap-4 p-4 lg:pl-9",
                isActive &&
                  "rounded-r-full bg-primary text-primary-foreground max-lg:rounded-lg"
              )}
            >
              <Icon className={cn("size-5")} />

              <p className={cn("max-lg:hidden", isActive && "font-semibold")}>
                {label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default LeftSidebar
