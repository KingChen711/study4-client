import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

type TestDetail = {
  id: number
  testId: string
  testTitle: string
  duration: number
  testType: "Listening" | "Reading" | "Writing"
  totalEngaged: number
  totalQuestion: number
  totalSection: number
  tags: Tag[]
  testHistories: unknown[]
  testSections: TestSection[]
}

export type TestSection = {
  testSectionId: number
  testSectionName: string
  totalQuestion: number
  testSectionPartitions: [
    {
      partitionTag: {
        partitionTagDesc: "[Listening] Note/Form Completion"
      }
    },
  ]
}

type Tag = {
  tagId: number
  tagName: string
}

type Params = {
  userId?: string
  testId: string
}

//TODO:pass user id after have who am i
const getTest = cache(async (params: Params): Promise<TestDetail | null> => {
  try {
    const { data } = await prep4Api.get<{ data: TestDetail }>(
      `/api/tests/${params.testId}`,
      {
        params: { userId: params.userId },
      }
    )

    return data.data || null
  } catch (error) {
    return null
  }
})

export default getTest
