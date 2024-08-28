"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { type TestSection } from "@/queries/test/get-test"
import { type CheckedState } from "@radix-ui/react-checkbox"
import { Check, ChevronsUpDown, LightbulbIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TagBadges from "@/components/badges/tag-badge"

type LimitTimeState = {
  open: boolean
  value: string
}

type Props = {
  sections: TestSection[]
  testId: number
}

function PracticeTab({ sections, testId }: Props) {
  const router = useRouter()
  const t = useTranslations("TestDetailPage")

  const [pending, startTransition] = useTransition()

  const [selectedSectionIds, setSelectedSectionIds] = useState<number[]>([])
  const [limitTimeStates, setLimitTimeStates] = useState<LimitTimeState>({
    open: false,
    value: "no-limit",
  })

  const handleCheckedChange = (value: CheckedState, sectionId: number) => {
    const checked = value.valueOf() as boolean
    setSelectedSectionIds((prev) =>
      checked ? [...prev, sectionId] : prev.filter((i) => i !== sectionId)
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      router.push(
        `/tests/${testId}/practice?limit=${limitTimeStates.value}` +
          selectedSectionIds.map((id) => `&section=${id}`).join("")
      )
    })
  }

  return (
    <div>
      <Alert className="h-fit w-full border-primary">
        <LightbulbIcon className="size-4 stroke-primary" />
        <AlertTitle className="font-semibold text-primary">
          Pro tips:
        </AlertTitle>
        <AlertDescription className="text-primary">
          {t("ProTips")}
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-2">
        <h3 className="font-bold">{t("SelectSections")}</h3>
        {sections.map((section) => (
          <div
            key={section.testSectionId}
            className="flex cursor-pointer space-x-2"
          >
            <Checkbox
              checked={selectedSectionIds.includes(section.testSectionId)}
              onCheckedChange={(value) =>
                handleCheckedChange(value, section.testSectionId)
              }
              id={section.testSectionId.toString()}
            />
            <div className="grid cursor-pointer gap-1.5 leading-none">
              <label
                htmlFor={section.testSectionId.toString()}
                className="cursor-pointer select-none text-sm font-medium leading-none"
              >
                {section.testSectionName} ({section.totalQuestion}{" "}
                {t("Questions")})
              </label>
              <div className="flex items-center gap-x-2">
                {section.testSectionPartitions
                  .map((s) => s.partitionTag.partitionTagDesc)
                  .map((tag) => (
                    <TagBadges key={tag} tagName={tag} />
                  ))}
              </div>
            </div>
          </div>
        ))}
        <h3 className="font-bold">{t("LimitTime")}</h3>
        <div className="flex items-center gap-4">
          <LimitTimeSelector
            states={limitTimeStates}
            setStates={setLimitTimeStates}
          />
          <Button
            disabled={selectedSectionIds.length === 0 || pending}
            type="submit"
          >
            {t("Practice")}{" "}
            {pending && <Icons.Loader className="ml-1 size-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PracticeTab

const limitTimes = [
  "no-limit",
  "5",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
  "60",
]

function LimitTimeSelector({
  states,
  setStates,
}: {
  states: LimitTimeState
  setStates: React.Dispatch<React.SetStateAction<LimitTimeState>>
}) {
  const t = useTranslations("TestDetailPage")
  return (
    <Popover
      open={states.open}
      onOpenChange={(value) => setStates((prev) => ({ ...prev, open: value }))}
    >
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={states.open}
          className="flex-1 justify-between"
        >
          {states.value
            ? states.value === "no-limit"
              ? t("NoLimit")
              : `${states.value} ${t("Minutes")}`
            : "Select time limit..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {limitTimes.map((limitTime) => (
                <CommandItem
                  key={limitTime}
                  value={limitTime}
                  onSelect={(currentValue) => {
                    setStates({ open: false, value: currentValue })
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      states.value === limitTime ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {limitTime === "no-limit"
                    ? t("NoLimit")
                    : `${limitTime} ${t("Minutes")}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
