"use client"

import React from "react"

import Partitions from "./partitions"
import Passage from "./passage"
import Recording from "./recording"

type Props = {
  a?: string
  section: {
    testSectionId: number
    testSectionName: string
    readingDesc: string | null
    audioResourceUrl: string | null
    totalQuestion: number
  }
}

function SectionContent({ section }: Props) {
  return (
    <div className="flex min-h-full flex-col gap-y-6">
      <Recording srcUrl={section.audioResourceUrl} />

      <div className="grid grid-cols-12 gap-4">
        <Passage readingDesc={section.readingDesc} />
        <Partitions havePassage={!!section.readingDesc} />
      </div>
    </div>
  )
}

export default SectionContent
