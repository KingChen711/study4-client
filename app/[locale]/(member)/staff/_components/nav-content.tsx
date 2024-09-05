"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { staffRoutes } from "@/constants/routes"

import { cn } from "@/lib/utils"
import { SheetClose } from "@/components/ui/sheet"

const NavContent = () => {
  const pathname = usePathname()
  return (
    <section className="flex h-full flex-col gap-y-3 pt-6">
      {staffRoutes.map(({ Icon, label, route }) => {
        const isActive = pathname.endsWith(route)

        return (
          <SheetClose asChild key={route}>
            <Link
              href={route}
              className={cn(
                "flex items-center gap-4 p-4 px-8",
                isActive && "rounded-r-full bg-primary text-primary-foreground"
              )}
            >
              <Icon className={cn("size-5")} />
              <p>{label}</p>
            </Link>
          </SheetClose>
        )
      })}
    </section>
  )
}

export default NavContent
