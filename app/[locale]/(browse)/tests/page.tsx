import React, { Suspense } from "react"
import { type TestOrderBy } from "@/queries/test/get-tests"
import { z } from "zod"

import GoalCard, { GoalCardSkeleton } from "@/components/cards/goal-card"

import CategoryList, { CategoryListSkeleton } from "./_components/category-list"
import SearchBar from "./_components/search-bar"
import SortDropDown from "./_components/sort-drop-down"
import TestList, { TestListSkeleton } from "./_components/test-list"
import Title, { TitleSkeleton } from "./_components/title"

type Props = {
  searchParams: {
    category?: string
    term?: string
    page?: string
    orderBy?: TestOrderBy
  }
}

const testSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
  term: z.string().catch(""),
  orderBy: z.enum(["-totalEngaged", "-createDate"]).catch("-createDate"),
  category: z.string().catch("all"),
})

function TestsPage({ searchParams }: Props) {
  const { category, page, orderBy, term } =
    testSearchParamsSchema.parse(searchParams)

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

          <div className="flex items-center gap-x-2">
            <SearchBar initTerm={term} />
            <SortDropDown orderBy={orderBy} />
          </div>
        </div>

        <div className="col-span-3">
          <Suspense fallback={<GoalCardSkeleton className="w-full" />}>
            <GoalCard className="w-full" />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<TestListSkeleton />}>
        <TestList
          term={term}
          page={page}
          orderBy={orderBy}
          category={category}
        />
      </Suspense>
    </div>
  )
}

export default TestsPage
