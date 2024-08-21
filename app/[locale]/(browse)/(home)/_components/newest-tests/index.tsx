import React, { Suspense } from "react"

import TestList, { TestListSkeleton } from "./test-list"
import Title, { TitleSkeleton } from "./title"

function NewestTests() {
  return (
    <div className="mt-8 flex flex-col">
      <Suspense fallback={<TitleSkeleton />}>
        <Title />
      </Suspense>
      <Suspense fallback={<TestListSkeleton />}>
        <TestList />
      </Suspense>
    </div>
  )
}

export default NewestTests
