"use client"

import React from "react"

import { type TestSection } from "@/types/do-test"

import SectionBadge from "../../../../../../../../components/badges/section-badge"

type Props = {
  sections: TestSection[]
  activeSection: string
  onClickSection: (sectionName: string) => void
}

function SectionTabs({ activeSection, onClickSection, sections }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {sections.map((section) => (
        <SectionBadge
          key={section.testSectionId}
          sectionName={section.testSectionName}
          title={section.testSectionName}
          active={activeSection === section.testSectionName}
          onClickSection={onClickSection}
        />
      ))}
    </div>
  )
}

export default SectionTabs
