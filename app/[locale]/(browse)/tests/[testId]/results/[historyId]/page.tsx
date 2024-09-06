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
  const testHistroyDetail = await getHistory({ historyId })

  if (!testHistroyDetail) return notFound()

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 rounded-lg border p-4">
        <Suspense fallback={<OverallResultSkeleton />}>
          <OverallResult
            testName={"Listening Test 1"}
            testId={+testId}
            testHistory={testHistroyDetail.testHistory}
          />
        </Suspense>
        <Suspense fallback={<DetailResultSkeleton />}>
          <DetailResult sectionHistories={testHistroyDetail.sectionHistories} />
        </Suspense>
        <AnswerDetail sections={testHistroyDetail.sectionHistories} />
      </div>
      <CommentList testId={testId} />
    </div>
  )
}

export default HistoryDetailPage
