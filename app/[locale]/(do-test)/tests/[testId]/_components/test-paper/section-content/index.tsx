"use client"

import React from "react"
import { type TestGrade } from "@/queries/test/get-history"

import { type TestSection } from "@/types/do-test"
import { cn } from "@/lib/utils"
import Passage from "@/components/ui/passage"
import Recording from "@/components/ui/recording"

import Partitions from "./partitions"

type Props = {
  section: TestSection
  active: boolean
  showAnswer?: boolean
  testGrades?: TestGrade[]
}

function SectionContent({ section, showAnswer, testGrades, active }: Props) {
  return (
    <div className={cn("hidden h-full flex-col gap-y-6", active && "flex")}>
      <Recording srcUrl={section.cloudResource?.url || null} />

      <div className="grid grid-cols-12 gap-4 xl:h-full">
        <Passage readingDesc={section.readingDesc} doTestLayout />
        <Partitions
          showAnswer={showAnswer}
          testGrades={testGrades}
          partitions={section.testSectionPartitions}
          havePassage={!!section.readingDesc}
        />
      </div>
    </div>
  )
}

export default SectionContent
