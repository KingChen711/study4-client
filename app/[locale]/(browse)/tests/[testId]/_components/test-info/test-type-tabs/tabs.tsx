"use client"

import React from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { type TestType } from "./index"

const tabs = [
  {
    value: "practice",
    tText: "Practice",
  },
  {
    value: "full",
    tText: "DoFullTest",
  },
] as const

type Props = {
  activeTab: TestType
  setActiveType: React.Dispatch<React.SetStateAction<TestType>>
}

function Tabs({ activeTab, setActiveType }: Props) {
  const t = useTranslations("TestDetailPage")
  return (
    <div className="mb-4 flex border-b">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          onClick={() => setActiveType(tab.value)}
          className={cn(
            "relative w-28 cursor-pointer pb-4 text-center text-muted-foreground",
            activeTab === tab.value && "cursor-default font-bold text-primary"
          )}
        >
          {t(tab.tText)}
          {activeTab === tab.value && (
            <div className="absolute bottom-0 left-0 h-[3px] w-full bg-primary" />
          )}
        </div>
      ))}
    </div>
  )
}

export default Tabs
