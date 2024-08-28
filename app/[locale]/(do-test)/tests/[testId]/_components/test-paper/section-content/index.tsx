"use client"

import React from "react"
import { type TestSection } from "@/queries/test/get-practice-test"

import Partitions from "./partitions"
import Passage from "./passage"
import Recording from "./recording"

type Props = {
  a?: string
  section: TestSection
}

function SectionContent({ section }: Props) {
  return (
    <div className="flex min-h-full flex-col gap-y-6">
      <Recording srcUrl={section.audioResourceUrl} />

      <div className="grid grid-cols-12 gap-4">
        <Passage readingDesc={section.readingDesc} />
        <Partitions
          partitions={section.testSectionPartitions}
          havePassage={!!section.readingDesc}
        />
      </div>
    </div>
  )
}

export default SectionContent
