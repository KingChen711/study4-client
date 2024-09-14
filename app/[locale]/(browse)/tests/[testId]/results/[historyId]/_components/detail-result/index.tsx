"use client"

import React, { useState } from "react"
import { type SectionHistory } from "@/queries/test/get-history"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"

import SectionTabs from "./section-tabs"
import TableResult from "./table-result"

type Props = { sectionHistories: SectionHistory[] }

function DetailResult({ sectionHistories }: Props) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionHistories[0].sectionName
  )

  const t = useTranslations("TestResultPage")

  function handleClickSection(sectionName: string) {
    setActiveSection(sectionName)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="my-2 text-xl font-bold">{t("Analysis")}</h3>

      <SectionTabs
        activeSection={activeSection}
        onClickSection={handleClickSection}
        sections={sectionHistories.map((ts) => ({
          testSectionName: ts.sectionName,
        }))}
      />
      <TableResult
        section={
          sectionHistories.find((sh) => sh.sectionName === activeSection)!
        }
      />
    </div>
  )
}

export default DetailResult

export function DetailResultSkeleton() {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="my-2 h-7 w-52" />

      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-[34px] w-36" />
        <Skeleton className="h-[34px] w-36" />
        <Skeleton className="h-[34px] w-36" />
        <Skeleton className="h-[34px] w-36" />
      </div>

      <Skeleton className="mb-4 mt-1 h-52 w-full rounded-xl" />
    </div>
  )
}
