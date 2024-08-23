import React, { Suspense } from "react"

import GoalCard from "@/components/cards/goal-card"

import CategoryList, { CategoryListSkeleton } from "./_components/category-list"
import SearchBar from "./_components/search-bar"
import TestList from "./_components/test-list"
import Title, { TitleSkeleton } from "./_components/title"

type Props = {
  params: {
    locale: string
    category: string
  }
  searchParams: {
    term?: string
  }
}

function TestsCategoryPage({ params, searchParams }: Props) {
  const { category } = params
  const { term } = searchParams
  console.log({ category })

  return (
    <div className="flex flex-col gap-y-6 py-8">
      <div className="gap-4 max-lg:flex max-lg:flex-col-reverse lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-y-6 lg:col-span-9">
          <Suspense fallback={<TitleSkeleton />}>
            <Title />
          </Suspense>

          <Suspense fallback={<CategoryListSkeleton />}>
            <CategoryList activeCategory={category} />
          </Suspense>

          <SearchBar initTerm={term || ""} />
        </div>

        <GoalCard className="h-full lg:col-span-3"></GoalCard>
      </div>

      <Suspense fallback="Loading...">
        <TestList />
      </Suspense>
    </div>
  )
}

export default TestsCategoryPage
