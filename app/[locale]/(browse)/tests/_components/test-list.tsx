import React from "react"
import getTests, { type TestOrderBy } from "@/queries/test/get-tests"

import TestCard from "@/components/cards/test-card"

type Props = {
  term: string
  page: number
  orderBy: TestOrderBy
  category: string
}

//TODO: no result
async function TestList({ page, term, orderBy, category }: Props) {
  const { tests } = await getTests({
    orderBy,
    term,
    page,
    pageSize: 12,
    category: category === "all" ? undefined : category,
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
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
    </div>
  )
}

export default TestList
