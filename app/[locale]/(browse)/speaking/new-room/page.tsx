"use client"

import React, { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { bands } from "@/constants"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { z } from "zod"

import { cn, generateRoomId } from "@/lib/utils"
import { joinRoom } from "@/actions/speaking/join-room"
import useUsers from "@/hooks/use-speaking-samples"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import Paginator from "@/components/ui/paginator"
import ParseHtml from "@/components/ui/parse-html"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const testSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
})

function NewRoom() {
  const client = useStreamVideoClient()
  const { user } = useUser()
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [selectedBand, setSelectedBand] = React.useState<string>(bands[1])
  const [selectedSpeakingSample, setSelectedSpeakingSample] = useState<
    number | null
  >()
  const [selectedParts, setSelectedParts] = useState<number[]>([])
  const [isPrivate, setIsPrivate] = useState(false)

  const searchParams = useSearchParams()
  const { page } = testSearchParamsSchema.parse({
    page: searchParams.get("page"),
  })
  const { data } = useUsers({ page })
  const t = useTranslations("SpeakingPage")

  const handleCreateRoom = () => {
    if (!client || !user) return

    startTransition(async () => {
      if (!selectedSpeakingSample) {
        toast(t("NotSelectSample"))
        return
      }

      if (selectedParts.length <= 0) {
        toast(t("NotSelectParts"))
        return
      }

      const dateTime = new Date()
      const id = generateRoomId()
      const call = client.call("default", id)
      if (!call) throw new Error(t("FailedCreateMeeting"))
      const startsAt =
        dateTime.toISOString() || new Date(Date.now()).toISOString()

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: "Speaking room",
          },
        },
      })

      await joinRoom({
        roomId: call.id,
        userId: user.id,
        band: selectedBand,
        speakingSampleId: selectedSpeakingSample,
        speakingParts: selectedParts,
        isPrivate,
      })

      router.push(`/speaking/${call.id}`)
    })
  }

  useEffect(() => {
    setSelectedSpeakingSample(null)
  }, [page])

  useEffect(() => {
    setSelectedParts([])
  }, [selectedSpeakingSample])

  if (!client || !user)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  console.log({ data })

  return (
    <div className="mt-8">
      <div className="text-3xl font-bold">{t("CreateRoom")}</div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label className="text-base">{t("SelectBandScore")}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {selectedBand
                ? bands
                    .filter((b) => b !== "All")
                    .find((band) => band === selectedBand)
                : "Select band..."}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {bands
                    .filter((b) => b !== "All")
                    .map((band) => (
                      <CommandItem
                        key={band}
                        value={band}
                        onSelect={(currentValue) => {
                          setSelectedBand(
                            currentValue === selectedBand ? "" : currentValue
                          )
                          setOpen(false)
                        }}
                      >
                        {band}
                        <CheckIcon
                          className={cn(
                            "ml-auto size-4",
                            selectedBand === band ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-6 flex flex-col">
        <Label className="text-base">{t("PrivateRoom")}</Label>
        <div className="mt-2 flex items-center gap-x-2">
          <Checkbox
            id="private"
            checked={isPrivate}
            onCheckedChange={(value) => {
              setIsPrivate(value as boolean)
            }}
          />
          <label
            htmlFor="private"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {t("PrivateRoomDesc")}
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-y-2">
        <Label className="text-base">{t("SelectSpeakingSample")}</Label>
        <div className="grid grid-cols-12 gap-4">
          {data?.speakingSamples.map((test) => {
            return (
              <div
                className={cn(
                  "col-span-12 cursor-pointer rounded-md border p-4 font-medium sm:col-span-6 lg:col-span-3",
                  test.speakingSampleId === selectedSpeakingSample &&
                    "border-primary"
                )}
                key={test.speakingSampleId}
                onClick={() => {
                  setSelectedSpeakingSample(test.speakingSampleId)
                }}
              >
                {test.speakingSampleName}
              </div>
            )
          })}
        </div>
        {data && data.speakingSamples.length > 0 && (
          <Paginator
            metadata={{
              pageNumber: page,
              totalPages: data.totalPage,
            }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label className="text-base">{t("SelectParts")}</Label>
        {!selectedSpeakingSample ? (
          <div className="text-sm">{t("SelectSampleBefore")}</div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {data?.speakingSamples
              .find((t) => t.speakingSampleId === selectedSpeakingSample)
              ?.speakingParts.map((tp) => (
                <div
                  key={tp.speakingPartId}
                  className={cn(
                    "str-video flex cursor-pointer flex-col rounded-xl border-2 p-4",
                    selectedParts.includes(tp.speakingPartId) &&
                      "border-primary"
                  )}
                  onClick={() => {
                    const isChecked = selectedParts.includes(tp.speakingPartId)
                    if (!isChecked) {
                      setSelectedParts((prev) => [...prev, tp.speakingPartId])
                    } else {
                      setSelectedParts((prev) =>
                        prev.filter((p) => p !== tp.speakingPartId)
                      )
                    }
                  }}
                >
                  <div className="text-lg font-bold">
                    Part {tp.speakingPartNumber}
                  </div>
                  <ParseHtml data={tp.speakingPartDescription} />
                </div>
              ))}
          </div>
        )}
      </div>

      <Button
        className="float-right ml-auto mt-6"
        onClick={handleCreateRoom}
        disabled={pending || !client || !user}
      >
        {t("CreateRoom")} {pending && <Icons.Loader className="ml-1 size-4" />}
      </Button>
    </div>
  )
}

export default NewRoom
