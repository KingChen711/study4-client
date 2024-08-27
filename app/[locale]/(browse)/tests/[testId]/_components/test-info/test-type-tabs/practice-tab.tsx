"use client"

import React, { useState } from "react"
import { type TestSection } from "@/queries/test/get-test"
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
}

function PracticeTab({ sections }: Props) {
  const t = useTranslations("TestDetailPage")

  const [limitTimeStates, setLimitTimeStates] = useState<LimitTimeState>({
    open: false,
    value: "no-limit",
  })

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

      <form className="mt-5 flex flex-col gap-y-2">
        <h3>Chọn phần thi bạn muốn làm:</h3>
        {sections.map((section) => (
          <div
            key={section.testSectionId}
            className="flex cursor-pointer space-x-2"
          >
            <Checkbox id={section.testSectionId.toString()} />
            <div className="grid cursor-pointer gap-1.5 leading-none">
              <label
                htmlFor={section.testSectionId.toString()}
                className="text-sm font-medium leading-none"
              >
                {section.testSectionName} ({section.totalQuestion} câu hỏi)
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
        <h3>Giới hạn thời gian:</h3>
        <div className="flex items-center gap-4">
          <LimitTimeSelector
            states={limitTimeStates}
            setStates={setLimitTimeStates}
          />
          <Button>Luyện tập</Button>
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
  return (
    <Popover
      open={states.open}
      onOpenChange={(value) => setStates((prev) => ({ ...prev, open: value }))}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={states.open}
          className="flex-1 justify-between"
        >
          {states.value
            ? states.value === "no-limit"
              ? "no-limit"
              : `${states.value} phút`
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
                  {limitTime === "no-limit" ? "no-limit" : `${limitTime} phút`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
