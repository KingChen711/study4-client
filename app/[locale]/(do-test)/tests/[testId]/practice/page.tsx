import React from "react"
import { practiceTest } from "@/constants"

import EscapeDialog from "../_components/escape-dialog"
import TestPaper from "../_components/test-paper"
import SectionContent from "../_components/test-paper/section-content"
import SectionTabs from "../_components/test-paper/section-tabs"

type Props = {
  params: {
    testId: string
  }
  searchParams: {
    section: string[]
    limit: string
  }
}

function PracticePage({ params, searchParams }: Props) {
  const { testId } = params
  const { limit, section } = searchParams
  const test = practiceTest

  console.log({ testId, limit, section })
  //TODO:test not found

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <EscapeDialog testId={test.id} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <TestPaper />
        <div className="relative col-span-2">
          <div className="sticky top-24 h-96 rounded-lg border bg-red-500"></div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
