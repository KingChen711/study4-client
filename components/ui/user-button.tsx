"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"

import { getUsernameFromEmail } from "@/lib/utils"

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

  const { isLoaded, user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  //TODO: may need to add skeleton
  if (!isLoaded) return <Skeleton className="size-[30px] rounded-full" />

  if (!user?.id) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Image
            alt={user?.primaryEmailAddress?.emailAddress || ""}
            src={user?.imageUrl}
            width={30}
            height={30}
            className="rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="rounded-2xl py-3">
          <DropdownMenuLabel asChild>
            <div className="flex items-center gap-3 px-6">
              <Image
                alt={user?.primaryEmailAddress?.emailAddress || ""}
                src={user?.imageUrl}
                width={44}
                height={44}
                className="rounded-full"
              />
              <div className="flex flex-col gap-y-1">
                <div className="text-sm font-medium leading-none">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.primaryEmailAddress?.emailAddress
                      ? getUsernameFromEmail(
                          user?.primaryEmailAddress?.emailAddress
                        )
                      : ""}
                </div>
                <div className="text-sm leading-none text-muted-foreground">
                  {user.username ||
                    (user?.primaryEmailAddress?.emailAddress
                      ? getUsernameFromEmail(
                          user?.primaryEmailAddress?.emailAddress
                        )
                      : "")}
                </div>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <button
              className="w-full justify-start gap-x-3 px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-card"
              onClick={() => openUserProfile()}
            >
              <div className="flex items-center justify-center px-4">
                <Icons.Setting className="size-3" />
              </div>
              Cài đặt tài khoản
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              className="w-full justify-start gap-x-3 px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-card"
              onClick={() => signOut(() => router.push("/"))}
            >
              <div className="flex items-center justify-center px-4">
                <Icons.SignOut className="size-3" />
              </div>
              Đăng xuất
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
