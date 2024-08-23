import React, { Suspense } from "react"

import CategoryList, { CategoryListSkeleton } from "./_components/category-list"
import TestList from "./_components/test-list"
import Title, { TitleSkeleton } from "./_components/title"

type Props = {
  params: {
    locale: string
    category: string
  }
}

function TestsCategoryPage({ params }: Props) {
  const { category } = params
  console.log({ category })

  return (
    <div className="flex flex-col gap-y-6 py-8">
      <Suspense fallback={<TitleSkeleton />}>
        <Title />
      </Suspense>
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList activeCategory={category} />
      </Suspense>

      <Suspense fallback="Loading...">
        <TestList />
      </Suspense>
    </div>
  )
}

export default TestsCategoryPage
