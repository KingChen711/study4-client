"use client"

import React from "react"

import { type TestSection } from "@/types/do-test"
import Passage from "@/components/ui/passage"
import Recording from "@/components/ui/recording"

import Partitions from "./partitions"

type Props = {
  section: TestSection
}

function SectionContent({ section }: Props) {
  return (
    <div className="flex min-h-full flex-col gap-y-6">
      <Recording srcUrl={section.cloudResource?.url || null} />

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
