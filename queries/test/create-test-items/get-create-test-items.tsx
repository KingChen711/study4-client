import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export type TestCategory = {
  testCategoryId: number
  testCategoryName: string
}

export type Tag = {
  tagId: number
  tagName: string
}

export type PartitionTag = {
  partitionTagId: number
  partitionTagDesc: string
}

export type CreateTestItems = {
  testCategories: TestCategory[]
  tags: Tag[]
  partitionTags: PartitionTag[]
}

const getCreateTestItem = cache(async (): Promise<CreateTestItems | null> => {
  try {
    const { data } = await prep4Api.get<{ data: CreateTestItems }>(
      `/api/tests/create/detail`
    )

    return data.data || null
  } catch (error) {
    return null
  }
})

export default getCreateTestItem
