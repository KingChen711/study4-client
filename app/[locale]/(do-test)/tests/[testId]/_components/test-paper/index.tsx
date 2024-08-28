"use client"

import React, { useState } from "react"
import { practiceTest } from "@/constants"

import SectionContent from "./section-content"
import SectionTabs from "./section-tabs"

function TestPaper() {
  const testSections = practiceTest.testSections
  const [activeSection, setActiveSection] = useState<number>(
    testSections[0].testSectionId
  )

  function handleClickSection(sectionId: number) {
    setActiveSection(sectionId)
  }

  return (
    <section className="col-span-10 flex flex-col gap-y-4 rounded-lg border bg-card p-4">
      <SectionTabs
        activeSection={activeSection}
        onClickSection={handleClickSection}
      />
      <SectionContent
        //TODO:fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        section={testSections.find((s) => s.testSectionId === activeSection)}
      />
    </section>
  )
}

export default TestPaper
