import React from "react"

import { tests } from "@/lib/seed"
import TestCard, { TestCardSkeleton } from "@/components/cards/test-card"

async function TestList() {
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
          totalQuestions={test.totalQuestions}
          totalSections={test.totalSections}
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
          totalQuestions={test.totalQuestions}
          totalSections={test.totalSections}
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
          totalQuestions={test.totalQuestions}
          totalSections={test.totalSections}
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
          totalQuestions={test.totalQuestions}
          totalSections={test.totalSections}
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
