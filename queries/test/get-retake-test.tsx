import { cache } from "react"

import "server-only"

import { type DoTest } from "@/types/do-test"
import prep4Api from "@/lib/prep4-api"

export type TestGrade = {
  testGradeId: number
  gradeStatus: "Wrong" | "Correct" | "Skip"
  questionNumber: number
}

type Params = {
  section: number[]
  testId: string
  testHistoryId: string
}

const getRetakeTest = cache(
  async ({
    testId,
    section,
    testHistoryId,
  }: Params): Promise<{ test: DoTest | null; testGrades: TestGrade[] }> => {
    try {
      const { data } = await prep4Api.get<{
        data: { test: DoTest; testGrades: TestGrade[] }
      }>(
        `/api/tests/${testId}/re-submit?${section.map((s) => `&section=${s}`).join("")}&testHistoryId=${testHistoryId}`
      )

      return data.data || { test: null, testGrades: [] }
    } catch (error) {
      return { test: null, testGrades: [] }
    }
  }
)

export default getRetakeTest
