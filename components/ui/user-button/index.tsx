"use client"

import { useEffect, useRef, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { Card } from "../card"
import { Separator } from "../separator"
import { Skeleton } from "../skeleton"
import LanguageButton from "./language-button"
import { LanguageMenu } from "./language-menu"
import ManageAccountButton from "./manage-account-button"
import MenuHeader from "./menu-header"
import SignOutButton from "./sign-out-button"
import TriggerAvatar from "./trigger-avatar"

export const UserButton = () => {
  const t = useTranslations("UserButton")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isLoaded, user } = useUser()

  const [open, setOpen] = useState(false)
  const [openMenuLanguage, setOpenMenuLanguage] = useState(false)

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isLoaded) return <Skeleton className="size-[30px] rounded-full" />

  if (!user?.id) return null

  function handleClickOutside(event: MouseEvent): void {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false)
      setOpenMenuLanguage(false)
    }
  }

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <TriggerAvatar open={open} setOpen={setOpen} user={user} />

      <Card
        style={{
          top: "calc(100% + 10px)",
        }}
        className={cn(
          "absolute -right-2 hidden w-[300px] flex-col rounded-2xl bg-card py-3 shadow-md",
          open && "flex"
        )}
      >
        <MenuHeader user={user} />

        <Separator />

        <LanguageButton
          setOpenMainMenu={setOpen}
          setOpenMenuLanguage={setOpenMenuLanguage}
          t={t}
        />

        <ManageAccountButton t={t} setOpen={setOpen} />

        <SignOutButton t={t} />
      </Card>

      <LanguageMenu
        t={t}
        openMenuLanguage={openMenuLanguage}
        setOpenMenuLanguage={setOpenMenuLanguage}
        setOpen={setOpen}
      />
    </div>
  )
}
