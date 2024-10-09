import React from "react"
import { notFound } from "next/navigation"
import getFullTest from "@/queries/test/get-full-test"
import getHistory from "@/queries/test/get-history"
import getPracticeTest from "@/queries/test/get-practice-test"

import Logo from "@/app/[locale]/(browse)/_components/header/logo"

import AnswerProgress from "../../../_components/answer-progress"
import EscapeDialog from "../../../_components/escape-dialog"
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
    <div className="relative flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-between gap-3 bg-card px-6 py-4">
        <div className="flex-1">
          <Logo />
        </div>
        <h2 className="text-xl font-bold">
          {testHistoryDetail?.testHistory.test.testTitle}
        </h2>
        <div className="flex flex-1 justify-end">
          <EscapeDialog testId={test.id} />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-1 gap-4 bg-[#f2f4f7] px-2 pb-[128px] pt-[76px]">
        <TestPaper
          test={test}
          showAnswer
          testGrades={testHistoryDetail.sectionHistories.flatMap((sh) =>
            sh.partitionHistories.flatMap((ph) => ph.testGrades)
          )}
        />
      </div>
      <AnswerProgress
        showAnswer
        testId={test.id}
        limit={Math.round(test.duration / 60).toString()}
      />
    </div>
  )
}

export default AnswerDetailPage
