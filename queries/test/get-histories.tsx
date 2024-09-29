import { cache } from "react"

import "server-only"

import { type TestType } from "@/types"

import prep4Api from "@/lib/prep4-api"

import whoAmI from "../users/who-am-i"
import { type TestHistory } from "./get-test"

type Params = {
  pageSize: number
  page: number
}

type History = {
  id: number
  testId: string
  testTitle: string
  duration: number
  testType: TestType
  totalEngaged: number
  totalQuestion: number
  totalSection: number
  testCategoryId: number
  isDraft: false
  userId: string
  createDate: string
  modifiedDate: null
  testHistories: TestHistory[]
}

type GetHistoriesResult = {
  userTests: History[]
  page: number
  totalPage: number
}

const getHistories = cache(
  async (params: Params): Promise<GetHistoriesResult> => {
    try {
      const currentUser = await whoAmI()

      if (!currentUser) return { userTests: [], page: 0, totalPage: 0 }

      const { data } = await prep4Api.get<{ data: GetHistoriesResult }>(
        "/api/test-histories",
        {
          params: {
            ...params,
            userId: currentUser ? currentUser.userId : undefined,
          },
        }
      )

      return data.data || { page: 0, totalPage: 0, userTests: [] }
    } catch (error) {
      return { page: 0, totalPage: 0, userTests: [] }
    }
  }
)

export default getHistories
