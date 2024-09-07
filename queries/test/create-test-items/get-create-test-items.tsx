import { cache } from "react"

import "server-only"

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
  // try {
  //   const { data } = await prep4Api.get<{ data: CreateTestItems }>(
  //     `/api/tests/create/detail`
  //   )

  //   return data.data || null
  // } catch (error) {
  //   return null
  // }
  return {
    testCategories: [
      {
        testCategoryId: 1,
        testCategoryName: "IELTS Academic",
      },
      {
        testCategoryId: 2,
        testCategoryName: "IELTS General",
      },
    ],
    tags: [
      {
        tagId: 1,
        tagName: "IELTS Academic",
      },
      {
        tagId: 2,
        tagName: "IELTS General",
      },
      {
        tagId: 3,
        tagName: "Reading",
      },
      {
        tagId: 4,
        tagName: "Listening",
      },
      {
        tagId: 5,
        tagName: "Writing",
      },
      {
        tagId: 6,
        tagName: "Speaking",
      },
    ],
    partitionTags: [
      {
        partitionTagId: 1,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 2,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 3,
        partitionTagDesc: "[Listening] Multiple Choice",
      },
      {
        partitionTagId: 4,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 5,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 6,
        partitionTagDesc: "[Listening] Summary/Flow chart Completion",
      },
      {
        partitionTagId: 7,
        partitionTagDesc: "[Listening] Matching",
      },
      {
        partitionTagId: 8,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 9,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 10,
        partitionTagDesc: "[Listening] Multiple Choice",
      },
      {
        partitionTagId: 11,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 12,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 13,
        partitionTagDesc: "[Listening] Summary/Flow chart Completion",
      },
      {
        partitionTagId: 14,
        partitionTagDesc: "[Listening] Matching",
      },
      {
        partitionTagId: 15,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 16,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 17,
        partitionTagDesc: "[Listening] Multiple Choice",
      },
      {
        partitionTagId: 18,
        partitionTagDesc: "[Listening] Note/Form Completion",
      },
      {
        partitionTagId: 19,
        partitionTagDesc: "[Listening] Table Completion",
      },
      {
        partitionTagId: 20,
        partitionTagDesc: "[Listening] Summary/Flow chart Completion",
      },
      {
        partitionTagId: 21,
        partitionTagDesc: "[Listening] Matching",
      },
    ],
  }
})

export default getCreateTestItem
