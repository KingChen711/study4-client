import React from "react"

import { GoalCardSkeleton } from "@/components/cards/goal-card"

import { TestInfoSkeleton } from "./_components/test-info"

function TestDetailLoading() {
  return (
    <div className="grid grid-cols-12 gap-6 py-8">
      <div className="col-span-9 flex flex-col gap-y-4">
        <TestInfoSkeleton />
        {/*TODO: <CommentListSkeleton />, -> do when have comment API */}
      </div>
      <div className="col-span-3">
        <GoalCardSkeleton className="w-full" />
      </div>
    </div>
  )
}

export default TestDetailLoading
