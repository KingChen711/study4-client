"use client"

import React from "react"

import SectionBadge from "@/components/badges/section-badge"

export type TestSection = {
  testSectionId?: number
  testSectionName: string
}

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
          key={section.testSectionId || section.testSectionName}
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
