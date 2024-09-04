import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export type FullTest = {
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
  audioResourceUrl: string | null
  readingDesc: string | null
  testSectionPartitions: Partition[]
}

export type Partition = {
  isVerticalLayout: boolean
  testSectionPartId: number
  partitionDesc: string
  questions: Question[]
}

export type Question = {
  isMultipleChoice: boolean
  questionId: number
  questionNumber: number
  questionDesc: string
  questionAnswers: QuestionAnswer[]
}

type QuestionAnswer = {
  questionAnswerId: number
  answerText: string
}

type Tag = {
  tagId: number
  tagName: string
}

type Params = {
  testId: string
}

const getFullTest = cache(
  async ({ testId }: Params): Promise<FullTest | null> => {
    try {
      const { data } = await prep4Api.get<{ data: FullTest }>(
        `/api/tests/${testId}/start`
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getFullTest
