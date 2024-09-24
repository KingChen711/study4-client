import React from "react"
import { notFound } from "next/navigation"
import getFullTest from "@/queries/test/get-full-test"
import getHistory from "@/queries/test/get-history"
import getPracticeTest from "@/queries/test/get-practice-test"

import AnswerProgress from "../../../_components/answer-progress"
import TestPaper from "../../../_components/test-paper"

type Props = {
  params: {
    historyId: string
    testId: string
  }
}

async function AnswerDetailPage({ params: { historyId, testId } }: Props) {
  const testHistoryDetail = await getHistory({ historyId })

  if (!testHistoryDetail) return notFound()

  const test = testHistoryDetail.testHistory.isFull
    ? await getFullTest({ testId })
    : await getPracticeTest({
        testId,
        section: testHistoryDetail.sectionHistories.map(
          (sh) => sh.testSectionId
        ),
      })

  if (!test) return notFound()

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">
          {testHistoryDetail?.testHistory.test.testTitle}
        </h2>
      </div>
      <div className="flex flex-1 gap-4">
        <TestPaper
          test={test}
          showAnswer
          testGrades={testHistoryDetail.sectionHistories.flatMap((sh) =>
            sh.partitionHistories.flatMap((ph) => ph.testGrades)
          )}
        />
        <AnswerProgress
          showAnswer
          testId={test.id}
          limit={Math.round(test.duration / 60).toString()}
        />
      </div>
    </div>
  )
}

export default AnswerDetailPage
