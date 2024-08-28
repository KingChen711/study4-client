import React from "react"

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

function SectionContent({}: Props) {
  return <div>SectionContent</div>
}

export default SectionContent
