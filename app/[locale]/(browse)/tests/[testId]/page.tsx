import React, { Suspense } from "react"

import GoalCard, { GoalCardSkeleton } from "@/components/cards/goal-card"

import CommentList from "./_components/comment-list"
import TestInfo, { TestInfoSkeleton } from "./_components/test-info"

type Props = {
  params: {
    testId: string
    locale: string
  }
}

async function TestDetailPage({ params }: Props) {
  const { testId, locale } = params

  return (
    <div className="grid grid-cols-12 gap-6 py-8">
      <div className="col-span-12 flex flex-col gap-y-4 lg:col-span-9">
        <Suspense fallback={<TestInfoSkeleton />}>
          <TestInfo testId={testId} locale={locale} />
        </Suspense>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <Suspense fallback={<GoalCardSkeleton className="w-full" />}>
          <GoalCard className="w-full" />
        </Suspense>
      </div>
    </div>
  )
}

export default TestDetailPage
