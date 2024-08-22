import React from "react"

import { CategoryListSkeleton } from "./_components/category-list"
import { TitleSkeleton } from "./_components/title"

function TestsLoadingPage() {
  //TODO: sync with page update
  return (
    <div className="flex flex-col gap-y-6 py-8">
      <TitleSkeleton />
      <CategoryListSkeleton />
    </div>
  )
}

export default TestsLoadingPage
