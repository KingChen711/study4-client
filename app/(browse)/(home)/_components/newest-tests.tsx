import React from "react"

import { tests } from "@/lib/seed"
import TestCard from "@/components/cards/test-card"

function NewestTests() {
  return (
    <div className="mt-8 flex flex-col">
      <h3 className="mb-4 text-center text-[28px] font-medium">
        Đề thi mới nhất
      </h3>

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
    </div>
  )
}

export default NewestTests
