"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { bands } from "@/constants"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { findPartner } from "@/actions/speaking/find-partner"
import { joinRoom } from "@/actions/speaking/join-room"
import usePremium from "@/hooks/use-premium"
import useRooms from "@/hooks/use-rooms"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"

import SpeakingSampleButton from "./_components/speaking-sample-button"

function RandomRoom() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("All")
  const [pending, startTransition] = useTransition()
  const [pending2, startTransition2] = useTransition()
  const client = useStreamVideoClient()
  const { user } = useUser()
  const { data: premium, isPending: loadingPremium } = usePremium()
  const router = useRouter()
  const tErrors = useTranslations("Errors")
  const t = useTranslations("SpeakingPage")
  const { data: rooms, isPending } = useRooms()

  const handleFindRandomRoom = () => {
    if (!client || !user) return

    startTransition(async () => {
      try {
        const res = await findPartner(value)

        if (res.isSuccess) {
          const roomId = res.data.roomId
          await joinRoom({ roomId, userId: user.id })
          router.push(`/speaking/${roomId}`)
          return
        }

        toast(tErrors(res.messageError))
      } catch (error) {
        console.error(error)
        toast("Failed to create Meeting")
      }
    })
  }

  const handleJoinRoom = (roomId: string) => {
    if (!user || pending2) return

    startTransition2(async () => {
      const res = await joinRoom({
        roomId,
        userId: user.id,
      })

      if (res.isSuccess) {
        router.push(`/speaking/${roomId}`)
        return
      }

      toast.error(res.messageError)
    })
  }

  if (!client || !user || loadingPremium)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  if (premium?.premiumPackageId !== 2 && premium?.premiumPackageId !== 3) {
    toast.error(
      "Bạn cần đăng ký gói thường hoặc gói nâng cao để sử dụng speaking room"
    )
    router.push("/premium")
    return
  }

  return (
    <div className="mt-8">
      <div className="text-3xl font-bold">{t("FindRandomRoom")}</div>

      <div className="mt-4 flex flex-col gap-y-2 border-b-2 pb-8">
        <Label className="text-base">{t("SelectBandScore")}</Label>
        <div className="flex gap-x-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? bands.find((band) => band === value)
                  : "Select band..."}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {bands.map((band) => (
                      <CommandItem
                        key={band}
                        value={band}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        {band}
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            value === band ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            onClick={handleFindRandomRoom}
            disabled={pending || !client || !user}
          >
            {t("Search")} {pending && <Icons.Loader className="ml-1 size-4" />}
          </Button>
        </div>
      </div>

      <div className="mt-6 text-2xl font-medium">{t("RoomsAvailable")}</div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {isPending && (
          <>
            <Skeleton className="h-[186px] w-[266px]" />
            <Skeleton className="h-[186px] w-[266px]" />
            <Skeleton className="h-[186px] w-[266px]" />
            <Skeleton className="h-[186px] w-[266px]" />
          </>
        )}

        {rooms?.map((room) => (
          <div
            key={room.id}
            className="flex w-fit flex-col gap-y-1 rounded-xl border bg-card p-5"
          >
            <div className="flex items-center gap-x-2">
              <p className="font-medium">{t("RoomCode")}</p> {room.roomId}
            </div>
            <div className="flex items-center gap-x-2">
              <p className="font-medium">Band:</p> {room.band}
            </div>
            <SpeakingSampleButton roomId={room.roomId} />
            <Button
              onClick={() => handleJoinRoom(room.roomId)}
              className="mt-2"
              disabled={pending2}
            >
              {t("Join")}
            </Button>
          </div>
        ))}

        {!isPending && rooms?.length === 0 && <div>{t("NotFoundRooms")}</div>}
      </div>
    </div>
  )
}

export default RandomRoom
