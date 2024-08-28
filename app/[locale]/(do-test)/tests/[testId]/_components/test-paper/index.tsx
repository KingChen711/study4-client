"use client"

import React, { useState } from "react"
import { type PracticeTest } from "@/queries/test/get-practice-test"

import SectionContent from "./section-content"
import SectionTabs from "./section-tabs"

type Props = {
  test: PracticeTest
}

function TestPaper({ test }: Props) {
  const testSections = test.testSections
  const [activeSection, setActiveSection] = useState<number>(
    testSections[0].testSectionId
  )

  function handleClickSection(sectionId: number) {
    setActiveSection(sectionId)
  }

  return (
    <section className="flex flex-1 flex-col gap-y-6 rounded-lg border bg-card p-4">
      <SectionTabs
        sections={testSections}
        activeSection={activeSection}
        onClickSection={handleClickSection}
      />
      <SectionContent
        section={testSections.find((s) => s.testSectionId === activeSection)!}
      />
    </section>
  )
}

export default TestPaper
