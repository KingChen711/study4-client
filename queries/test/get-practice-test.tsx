import { cache } from "react"

import "server-only"

import { type DoTest } from "@/types/do-test"
import prep4Api from "@/lib/prep4-api"

type Params = {
  section: number[]
  testId: string
}

const getPracticeTest = cache(
  async ({ testId, section }: Params): Promise<DoTest | null> => {
    try {
      const { data } = await prep4Api.get<{ data: DoTest }>(
        `/api/tests/${testId}/practice?${section.map((s) => `&section=${s}`).join("")}`
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getPracticeTest
