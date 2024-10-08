import React from "react"
import getTests from "@/queries/test/get-tests"

import TestCard, { TestCardSkeleton } from "@/components/cards/test-card"

async function TestList() {
  const { tests } = await getTests({
    orderBy: "-createDate",
    pageSize: 8,
    page: 1,
    term: "",
  })

  return (
    <div className="grid grid-cols-12 gap-4">
      {tests.map((test) => (
        <TestCard
          key={test.id}
          duration={test.duration}
          id={test.id}
          testId={test.testId}
          tags={test.tags}
          testTitle={test.testTitle}
          totalEngaged={test.totalEngaged}
          totalQuestion={test.totalQuestion}
          totalSection={test.totalSection}
          hasParticipated={test.testHistories.length > 0}
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
    </div>
  )
}

export default TestList

export function TestListSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <TestCardSkeleton
            key={i}
            className="col-span-12 sm:col-span-6 lg:col-span-3"
          />
        ))}
    </div>
  )
}
