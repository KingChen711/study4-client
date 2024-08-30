"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type Category = {
  testCategoryId: number
  testCategoryName: string
}

type Categories = Category[]

function useCategories() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      prep4Api
        .get<{ data: Categories }>("/api/test-categories")
        .then((res) => res.data.data || [])
        .catch((_: Error) => {
          return [] as Categories
        }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    placeholderData: keepPreviousData,
  })
}

export default useCategories
