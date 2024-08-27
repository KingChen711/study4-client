import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

type Params = {
  pageSize?: number
  page?: number
  term?: string
  orderBy?: "-createDate" | "-totalEngaged"
  userId?: string
}

type TestType = "Listening" | "Reading"

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

export type Tag = { tagId: string; tagName: string }

type GetTestsResult = { tests: Test[]; page: number; totalPage: number }

//TODO:pass user id after have who am i
const getTests = cache(async (params: Params): Promise<GetTestsResult> => {
  console.log("call get tests")

  const {
    orderBy = "-createDate",
    page = 1,
    pageSize = 12,
    term = "",
    userId,
  } = params

  try {
    const { data } = await prep4Api.get<{ data: GetTestsResult }>(
      "/api/tests",
      {
        params: {
          orderBy,
          page,
          pageSize,
          term,
          userId,
        },
      }
    )

    console.log({ data })

    return data.data
  } catch (error) {
    console.log({ error })
    return { page: 0, totalPage: 0, tests: [] }
  }
})

export default getTests
