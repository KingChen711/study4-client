"use client"

import React, { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { bands } from "@/constants"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { joinRoom } from "@/actions/speaking/join-room"
import useSpeakingSamples from "@/hooks/use-speaking-samples"
import { Button } from "@/components/ui/button"
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

  const searchParams = useSearchParams()
  const { page } = testSearchParamsSchema.parse({
    page: searchParams.get("page"),
  })
  const { data } = useSpeakingSamples({ page })

  const handleCreateRoom = () => {
    if (!client || !user) return

    startTransition(async () => {
      if (!selectedSpeakingSample) {
        toast("Chưa chọn mẫu bài nói")
        return
      }

      if (selectedParts.length <= 0) {
        toast("Chưa chọn phần nói")
        return
      }

      const dateTime = new Date()
      const id = crypto.randomUUID()
      const call = client.call("default", id)
      if (!call) throw new Error("Failed to create meeting")
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
      <div className="mt-8 flex justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  console.log({ data })

  return (
    <div className="mt-8">
      <div className="text-3xl font-bold">Tạo phòng speaking</div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label>Chọn band điểm:</Label>
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

      <div className="mt-4 flex flex-col gap-y-2">
        <Label>Chọn mẫu bài nói:</Label>
        <div className="grid grid-cols-12 gap-4">
          {data?.users.map((test) => {
            return (
              <div
                className={cn(
                  "col-span-12 cursor-pointer rounded-md border p-4 sm:col-span-6 lg:col-span-3",
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
        {data && data.users.length > 0 && (
          <Paginator
            metadata={{
              pageNumber: page,
              totalPages: data.totalPage,
            }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-col gap-y-2">
        <Label>Chọn phần nói: (có thể chọn nhiều)</Label>
        {!selectedSpeakingSample ? (
          <div className="text-sm">Chọn mẫu bài nói trước</div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {data?.users
              .find((t) => t.speakingSampleId === selectedSpeakingSample)
              ?.speakingParts.map((tp) => (
                <div key={tp.speakingPartId} className="str-video flex gap-x-4">
                  <input
                    type="checkbox"
                    checked={selectedParts.includes(tp.speakingPartNumber)}
                    onChange={(e) => {
                      const isChecked = e.target.checked
                      if (isChecked) {
                        setSelectedParts((prev) => [
                          ...prev,
                          tp.speakingPartNumber,
                        ])
                      } else {
                        setSelectedParts((prev) =>
                          prev.filter((p) => p !== tp.speakingPartNumber)
                        )
                      }
                    }}
                  />

                  <div>{tp.speakingPartNumber}</div>
                  <ParseHtml data={tp.speakingPartDescription} />
                </div>
              ))}
          </div>
        )}
      </div>

      <Button
        className="mt-6"
        onClick={handleCreateRoom}
        disabled={pending || !client || !user}
      >
        Tạo phòng {pending && <Icons.Loader className="ml-1 size-4" />}
      </Button>
    </div>
  )
}

export default NewRoom
