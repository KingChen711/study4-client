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

function RandomRoom() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("All")
  const [pending, startTransition] = useTransition()
  const client = useStreamVideoClient()
  const { user } = useUser()
  const router = useRouter()
  const tErrors = useTranslations("Errors")
  const t = useTranslations("SpeakingPage")

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

  if (!client || !user)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  return (
    <div className="mt-8">
      <div className="text-3xl font-bold">{t("FindRandomRoom")}</div>

      <div className="mt-4 flex flex-col gap-y-2">
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
    </div>
  )
}

export default RandomRoom
