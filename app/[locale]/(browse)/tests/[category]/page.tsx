import React, { Suspense } from "react"

import CategoryList, { CategoryListSkeleton } from "./_components/category-list"
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

      <div className="size-96 bg-red-500"></div>
    </div>
  )
}

export default TestsCategoryPage
