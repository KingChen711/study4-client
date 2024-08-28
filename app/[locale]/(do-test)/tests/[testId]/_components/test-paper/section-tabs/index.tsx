"use client"

import React from "react"
import { practiceTest } from "@/constants"

import SectionBadge from "./section-badge"

type Props = {
  // testSections:...
  activeSection: number
  onClickSection: (sectionId: number) => void
}

function SectionTabs({ activeSection, onClickSection }: Props) {
  const testSections = practiceTest.testSections

  return (
    <div className="flex flex-wrap items-center gap-3">
      {testSections.map((section) => (
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
