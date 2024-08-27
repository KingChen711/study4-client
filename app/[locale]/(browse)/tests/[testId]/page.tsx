import React, { Suspense } from "react"

import GoalCard, { GoalCardSkeleton } from "@/components/cards/goal-card"

import CommentList from "./_components/comment-list"
import TestInfo from "./_components/test-info"

type Props = {
  params: {
    testId: string
  }
}

function TestDetailPage({ params }: Props) {
  const { testId } = params

  return (
    <div className="grid grid-cols-12 gap-6 py-8">
      <div className="col-span-9 flex flex-col gap-y-4">
        <TestInfo testId={testId} />
        <CommentList testId={testId} />
      </div>
      <div className="col-span-3">
        <Suspense fallback={<GoalCardSkeleton className="w-full" />}>
          <GoalCard className="w-full" />
        </Suspense>
      </div>
    </div>
  )
}

export default TestDetailPage
