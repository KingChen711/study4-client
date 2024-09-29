import React from "react"
import getTests, { type TestOrderBy } from "@/queries/test/get-tests"

import NoResult from "@/components/ui/no-result"
import Paginator from "@/components/ui/paginator"
import TestCard, { TestCardSkeleton } from "@/components/cards/test-card"

type Props = {
  term: string
  page: number
  orderBy: TestOrderBy
  category: string
}

async function TestList({ page, term, orderBy, category }: Props) {
  const { tests, totalPage } = await getTests({
    orderBy,
    term,
    page,
    pageSize: 12,
    category: category === "all" ? undefined : category,
  })

  if (tests.length === 0) {
    return (
      <NoResult
        title="Not found any tests"
        className="mt-4"
        linkTitle="Reset filters"
        href="/tests"
      />
    )
  }

  return (
    <>
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

      {tests.length > 0 && (
        <Paginator
          metadata={{
            pageNumber: page,
            totalPages: totalPage,
          }}
        />
      )}
    </>
  )
}

export default TestList

export function TestListSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {Array(12)
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
