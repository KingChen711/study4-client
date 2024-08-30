import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

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
  tags: Tag[]
}

export type Tag = { tagId: number; tagName: string }

type GetTestsResult = { tests: Test[]; page: number; totalPage: number }

//TODO:do when have who am i: pass user id
const getTests = cache(async (params: Params): Promise<GetTestsResult> => {
  try {
    const { data } = await prep4Api.get<{ data: GetTestsResult }>(
      "/api/tests",
      {
        params,
      }
    )

    return data.data || { page: 0, totalPage: 0, tests: [] }
  } catch (error) {
    return { page: 0, totalPage: 0, tests: [] }
  }
})

export default getTests
