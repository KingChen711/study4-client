import { cache } from "react"

import "server-only"

import { type DoTest } from "@/types/do-test"
import prep4Api from "@/lib/prep4-api"

type Params = {
  testId: string
}

const getFullTest = cache(
  async ({ testId }: Params): Promise<DoTest | null> => {
    try {
      const { data } = await prep4Api.get<{ data: DoTest }>(
        `/api/tests/${testId}/start`
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getFullTest
