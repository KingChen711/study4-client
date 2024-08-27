import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export type Category = {
  testCategoryId: number
  testCategoryName: string
}

export type Tag = { tagId: string; tagName: string }

const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const { data } = await prep4Api.get<{ data: Category[] }>(
      "/api/test-categories"
    )

    return data.data || []
  } catch (error) {
    return []
  }
})

export default getCategories
