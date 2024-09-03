import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

import whoAmI from "../users/who-am-i"

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
  testHistories: TestHistory[]
  testSections: TestSection[]
}

export type TestHistory = {
  testHistoryId: number
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  totalQuestion: number
  totalCompletionTime: number
  takenDate: Date
  accuracyRate: number
  isFull: boolean
  testType: "Listening"
  bandScore: string
  partitionHistories: PartitionHistory[]
}

type PartitionHistory = {
  testSectionName: string
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
  testId: string
}

//TODO:do when have who am i: pass user id
const getTest = cache(async (params: Params): Promise<TestDetail | null> => {
  try {
    const currentUser = await whoAmI()

    const { data } = await prep4Api.get<{ data: TestDetail }>(
      `/api/tests/${params.testId}`,
      {
        params: { userId: currentUser ? currentUser.userId : undefined },
      }
    )

    return data.data || null
  } catch (error) {
    return null
  }
})

export default getTest
