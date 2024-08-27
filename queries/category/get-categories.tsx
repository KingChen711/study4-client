import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

type Category = {
  testCategoryId: number
  testCategoryName: string
}

export type Tag = { tagId: string; tagName: string }

type GetCategoriesResult = Category[]

const getCategories = cache(async (): Promise<GetCategoriesResult> => {
  try {
    const { data } = await prep4Api.get<{ data: GetCategoriesResult }>(
      "/api/test-categories"
    )

    return data.data || []
  } catch (error) {
    return []
  }
})

export default getCategories
