"use client"

import React from "react"
import { type TestSection } from "@/queries/test/get-practice-test"

import SectionBadge from "./section-badge"

type Props = {
  sections: TestSection[]
  activeSection: number
  onClickSection: (sectionId: number) => void
}

function SectionTabs({ activeSection, onClickSection, sections }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sections.map((section) => (
        <SectionBadge
          key={section.testSectionId}
          sectionId={section.testSectionId}
          title={section.testSectionName}
          active={activeSection === section.testSectionId}
          onClickSection={onClickSection}
        />
      ))}
    </div>
  )
}

export default SectionTabs
