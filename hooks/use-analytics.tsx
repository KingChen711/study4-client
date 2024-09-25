"use client"

import { type TestHistory } from "@/queries/test/get-test"
import { type TestType } from "@/types"
import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type Analytics = {
  testCategoryAnalytics: TestCategoryAnalytic[]
  testHistories: (TestHistory & { test: { id: number } })[]
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

function useAnalytics(qDays: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["users", "analytics"],
    queryFn: async () => {
      return prep4Api
        .get<{ data: Analytics }>(`/api/tests/analytics/?qDays=${qDays}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data.data || null)
        .catch((_: Error) => {
          return null
        })
    },
  })
}

export default useAnalytics
