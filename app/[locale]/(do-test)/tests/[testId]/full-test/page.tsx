import React from "react"
import { notFound } from "next/navigation"
import getFullTest from "@/queries/test/get-full-test"

import AnswerProgress from "../_components/answer-progress"
import EscapeDialog from "../_components/escape-dialog"
import TestPaper from "../_components/test-paper"

type Props = {
  params: {
    testId: string
  }
}

async function FullTestPage({ params }: Props) {
  const { testId } = params

  const test = await getFullTest({ testId })

  if (!test || test.testSections.length === 0) return notFound()

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <EscapeDialog testId={test.id} />
      </div>
      <div className="flex flex-1 gap-4">
        <TestPaper test={test} />
        <AnswerProgress
          isFullTest
          testId={test.id}
          limit={Math.round(test.duration / 60).toString()}
        />
      </div>
    </div>
  )
}

export default FullTestPage
