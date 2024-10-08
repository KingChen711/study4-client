import React from "react"

import { DetailResultSkeleton } from "./_components/detail-result"
import { OverallResultSkeleton } from "./_components/overall-result"

function ResultPageLoading() {
  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2 rounded-lg border p-4">
        <OverallResultSkeleton />
        <DetailResultSkeleton />
      </div>
    </div>
  )
}

export default ResultPageLoading
