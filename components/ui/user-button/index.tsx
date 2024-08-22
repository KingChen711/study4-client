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
import ThemeButton from "./theme-button"
import TriggerAvatar from "./trigger-avatar"

export const UserButton = () => {
  const t = useTranslations("UserButton")

  const dropdownRef = useRef<HTMLDivElement>(null)

  const { isLoaded, user } = useUser()

  const [open, setOpen] = useState(false)
  const [openMenuLanguage, setOpenMenuLanguage] = useState(false)
  const [openMenuTheme, setOpenMenuTheme] = useState(false)

  //TODO
  console.log({ openMenuTheme })

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!isLoaded) return <Skeleton className="size-[30px] rounded-full" />

  if (!user?.id) return null

  const handleClickOutside = (event: MouseEvent): void => {
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

        <div className="flex flex-col">
          <ThemeButton
            setOpenMainMenu={setOpen}
            setOpenMenuTheme={setOpenMenuTheme}
            t={t}
          />
          <LanguageButton
            setOpenMainMenu={setOpen}
            setOpenMenuLanguage={setOpenMenuLanguage}
            t={t}
          />
        </div>

        <Separator />

        <div className="flex flex-col">
          <ManageAccountButton t={t} setOpen={setOpen} />
          <SignOutButton t={t} />
        </div>
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
