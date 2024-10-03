import { cache } from "react"

import prep4Api from "@/lib/prep4-api"

import "server-only"

import { auth } from "@clerk/nextjs/server"

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
  const { getToken } = auth()
  try {
    const { data } = await prep4Api.get<{ data: CreateTestItems }>(
      `/api/tests/create/detail`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    return data.data || null
  } catch (error) {
    return null
  }
})

export default getCreateTestItem
