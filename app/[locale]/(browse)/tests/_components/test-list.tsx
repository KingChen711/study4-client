import React from "react"

import { tests } from "@/lib/seed"
import TestCard from "@/components/cards/test-card"

async function TestList() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <div className="grid grid-cols-12 gap-4">
      {tests.map((test) => (
        <TestCard
          key={test.id}
          duration={test.duration}
          testId={test.id}
          tags={test.tags}
          title={test.title}
          totalComments={test.totalComments}
          totalEngagements={test.totalEngagements}
          totalQuestion={test.totalQuestion}
          totalSection={test.totalSection}
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
      {tests.map((test) => (
        <TestCard
          key={test.id}
          duration={test.duration}
          testId={test.id}
          tags={test.tags}
          title={test.title}
          totalComments={test.totalComments}
          totalEngagements={test.totalEngagements}
          totalQuestion={test.totalQuestion}
          totalSection={test.totalSection}
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
      {tests.map((test) => (
        <TestCard
          key={test.id}
          duration={test.duration}
          testId={test.id}
          tags={test.tags}
          title={test.title}
          totalComments={test.totalComments}
          totalEngagements={test.totalEngagements}
          totalQuestion={test.totalQuestion}
          totalSection={test.totalSection}
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
      {tests.map((test) => (
        <TestCard
          key={test.id}
          duration={test.duration}
          testId={test.id}
          tags={test.tags}
          title={test.title}
          totalComments={test.totalComments}
          totalEngagements={test.totalEngagements}
          totalQuestion={test.totalQuestion}
          totalSection={test.totalSection}
          className="col-span-12 sm:col-span-6 lg:col-span-3"
        />
      ))}
    </div>
  )
}

export default TestList
