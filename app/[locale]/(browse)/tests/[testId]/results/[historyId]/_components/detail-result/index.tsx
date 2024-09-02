"use client"

import React, { useState } from "react"
import { type SectionHistory } from "@/queries/test/get-history"

import AnswerDetail from "../answer-detail"
import SectionTabs from "./section-tabs"
import TableResult from "./table-result"

type Props = { sectionHistories: SectionHistory[] }

function DetailResult({ sectionHistories }: Props) {
  const [activeSection, setActiveSection] = useState<string>(
    sectionHistories[0].sectionName
  )

  function handleClickSection(sectionName: string) {
    setActiveSection(sectionName)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="my-2 text-xl font-bold">Phân tích chi tiết:</h3>
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

//TODO:
export function DetailResultSkeleton() {
  return <div>DetailResultSkeleton</div>
}
