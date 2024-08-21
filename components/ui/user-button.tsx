"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"

import { cn, getUsernameFromEmail } from "@/lib/utils"

import { Card, CardContent, CardHeader } from "./card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Icons } from "./icons"
import { Skeleton } from "./skeleton"

export const UserButton = () => {
  const router = useRouter()
  const t = useTranslations("UserButton")

  const { isLoaded, user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const [open, setOpen] = useState(false)

  //TODO: may need to add skeleton
  if (!isLoaded) return <Skeleton className="size-[30px] rounded-full" />

  if (!user?.id) return null

  return (
    <div className="relative flex items-center justify-center">
      <button className="outline-none" onClick={() => setOpen(!open)}>
        <Image
          alt={user?.primaryEmailAddress?.emailAddress!}
          src={user?.imageUrl}
          width={30}
          height={30}
          className="rounded-full"
        />
      </button>

      <div className="">
        <Card
          style={{
            top: "calc(100% + 10px)",
          }}
          className={cn(
            "absolute -right-2 hidden w-[300px] flex-col rounded-2xl bg-card py-3 shadow-md",
            open && "flex"
          )}
        >
          <div className="flex min-w-fit flex-row items-center justify-start gap-3 px-6 py-3">
            <Image
              alt={user?.primaryEmailAddress?.emailAddress!}
              src={user?.imageUrl}
              width={44}
              height={44}
              className="block rounded-full"
            />
            <div className="flex flex-col gap-y-1 pr-11">
              <div className="line-clamp-1 text-sm font-medium">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : getUsernameFromEmail(
                      user?.primaryEmailAddress?.emailAddress!
                    )}
              </div>
              <div className="line-clamp-1 text-sm text-muted-foreground">
                {user.username ||
                  getUsernameFromEmail(
                    user?.primaryEmailAddress?.emailAddress!
                  )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
              onClick={() => {
                setOpen(false)
                openUserProfile()
              }}
            >
              <div className="flex items-center justify-center px-4">
                <Icons.Setting className="size-3" />
              </div>
              {t("ManageAccount")}
            </div>

            <div
              className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
              onClick={() => signOut(() => router.push("/"))}
            >
              <div className="flex items-center justify-center px-4">
                <Icons.SignOut className="size-3" />
              </div>
              {t("SignOut")}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
