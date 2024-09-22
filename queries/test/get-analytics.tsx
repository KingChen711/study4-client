import { cache } from "react"

import "server-only"

import { type TestType } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

type Params = {
  qDays: string
}

type Analytics = {
  testCategoryAnalytics: TestCategoryAnalytic[]
}

type TestCategoryAnalytic = {
  testCategoryName: string
  testAnalytics: {
    totalTestEngaged: number
    totalPracticeTime: number
    testTakenDate: Date
    targetScore: string
    testTypeAnalytics: [
      {
        testType: TestType
        totalTestEngaged: number
        averageAccuracyRate: number
        averagePracticeTime: number
        averageScore: string
        highestScore: string
        sectionsAnalytics: []
      },
    ]
  }
}

const getAnalytics = cache(
  async ({ qDays }: Params): Promise<Analytics | null> => {
    const { getToken } = auth()

    try {
      const { data } = await prep4Api.get<{ data: Analytics }>(
        `api/tests/analytics?qDays=${qDays}`,
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
  }
)

export default getAnalytics
