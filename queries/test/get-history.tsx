import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export interface TestHistoryDetail {
  testHistory: TestHistory
  sectionHistories: SectionHistory[]
}

export interface TestHistory {
  testHistoryId: number
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  totalQuestion: number
  totalCompletionTime: number
  takenDate: string
  accuracyRate: number
  isFull: boolean
  testType: string
  bandScore: string
  isResubmitted: boolean | null
  test: {
    testId: string
    testTitle: string
  }
}

export interface SectionHistory {
  testSectionId: number
  sectionName: string
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  accuracyRate: number
  partitionHistories: PartitionHistory[]
  transcript: string | null
}

export interface PartitionHistory {
  partitionHistoryId: number
  testSectionName: string
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  accuracyRate: number
  totalQuestion: number
  testHistoryId: number
  testGrades: TestGrade[]
  testSectionPartId: number
  testSectionPart: TestSectionPart
}

export interface TestGrade {
  testGradeId: number
  gradeStatus: "Skip" | "Correct" | "Wrong"
  questionNumber: number
  rightAnswer: string
  inputedAnswer: string
  questionId: number
  partitionHistoryId: number
}

export interface TestSectionPart {
  testSectionPartId: number
  partitionDesc: string | null
  isVerticalLayout: boolean
  partitionImage: string | null
  partitionTagId: number
  partitionTag: PartitionTag
  testSectionId: number
}

export interface PartitionTag {
  partitionTagId: number
  partitionTagDesc: string
}

type Params = {
  historyId: string
}

const getHistory = cache(
  async (params: Params): Promise<TestHistoryDetail | null> => {
    try {
      const { data } = await prep4Api.get<{ data: TestHistoryDetail }>(
        `/api/test-histories/${params.historyId}`
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getHistory
