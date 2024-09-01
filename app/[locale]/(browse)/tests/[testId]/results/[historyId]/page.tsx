import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import getHistory from "@/queries/test/get-history"

import GoalCard, { GoalCardSkeleton } from "@/components/cards/goal-card"

import CommentList from "../../_components/comment-list"
import DetailResult, { DetailResultSkeleton } from "./_components/detail-result"
import OverallResult, {
  OverallResultSkeleton,
} from "./_components/overall-result"

type Props = {
  testId: string
  historyId: string
}

async function HistoryDetailPage({ historyId, testId }: Props) {
  const testHistroyDetail = await getHistory({ historyId })

  if (!testHistroyDetail) return notFound()

  return (
    <div className="grid grid-cols-12 gap-6 py-8">
      <div className="col-span-12 flex flex-col gap-y-4 lg:col-span-9">
        <Suspense fallback={<OverallResultSkeleton />}>
          <OverallResult testHistory={testHistroyDetail.testHistory} />
        </Suspense>
        <Suspense fallback={<DetailResultSkeleton />}>
          <DetailResult sectionHistories={testHistroyDetail.sectionHistories} />
        </Suspense>
        <CommentList testId={testId} />
      </div>
      <div className="col-span-12 lg:col-span-3">
        <Suspense fallback={<GoalCardSkeleton className="w-full" />}>
          <GoalCard className="w-full" />
        </Suspense>
      </div>
    </div>
  )
}

export default HistoryDetailPage
