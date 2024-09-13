import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import getHistory from "@/queries/test/get-history"

import CommentList from "../../_components/comment-list"
import AnswerDetail from "./_components/answer-detail"
import DetailResult, { DetailResultSkeleton } from "./_components/detail-result"
import OverallResult, {
  OverallResultSkeleton,
} from "./_components/overall-result"

type Props = {
  params: {
    testId: string
    historyId: string
  }
}

async function HistoryDetailPage({ params: { historyId, testId } }: Props) {
  const testHistoryDetail = await getHistory({ historyId })

  if (!testHistoryDetail) return notFound()

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 rounded-lg border p-4">
        <Suspense fallback={<OverallResultSkeleton />}>
          <OverallResult
            testName={testHistoryDetail.testHistory.test.testTitle}
            testId={+testId}
            testHistory={testHistoryDetail.testHistory}
          />
        </Suspense>
        <Suspense fallback={<DetailResultSkeleton />}>
          <DetailResult sectionHistories={testHistoryDetail.sectionHistories} />
        </Suspense>
        <AnswerDetail
          testId={+testId}
          sections={testHistoryDetail.sectionHistories}
        />
      </div>
      <CommentList testId={testHistoryDetail.testHistory.test.testId} />
    </div>
  )
}

export default HistoryDetailPage
