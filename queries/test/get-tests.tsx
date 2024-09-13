import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

import whoAmI from "../users/who-am-i"

export type TestOrderBy = "-createDate" | "-totalEngaged"

type Params = {
  pageSize: number
  page: number
  term: string
  orderBy: TestOrderBy
  userId?: string
  category?: string
}

type TestType = "Listening" | "Reading" | "Writing"

type Test = {
  id: number
  testId: string
  testTitle: string
  duration: number //seconds
  testType: TestType
  totalEngaged: number
  totalQuestion: number
  totalSection: number
  createDate: Date
  testHistories: unknown[]
  tags: Tag[]
}

export type Tag = { tagId: number; tagName: string }

type GetTestsResult = { tests: Test[]; page: number; totalPage: number }

const getTests = cache(async (params: Params): Promise<GetTestsResult> => {
  try {
    const currentUser = await whoAmI()

    const { data } = await prep4Api.get<{ data: GetTestsResult }>(
      "/api/tests",
      {
        params: {
          ...params,
          userId: currentUser ? currentUser.userId : undefined,
        },
      }
    )

    return data.data || { page: 0, totalPage: 0, tests: [] }
  } catch (error) {
    return { page: 0, totalPage: 0, tests: [] }
  }
})

export default getTests
