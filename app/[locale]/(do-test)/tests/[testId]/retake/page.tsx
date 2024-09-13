import React from "react"
import { notFound } from "next/navigation"
import getRetakeTest from "@/queries/test/get-retake-test"
import { z } from "zod"

import AnswerProgress from "../_components/answer-progress"
import EscapeDialog from "../_components/escape-dialog"
import TestPaper from "../_components/test-paper"

type Props = {
  params: {
    testId: string
  }
  searchParams: {
    section: string[]
    limit: string
  }
}

const retakeSearchParamsSchema = z.object({
  testHistoryId: z.string().catch(""),
  section: z
    .union([z.coerce.number(), z.array(z.coerce.number())])
    .transform((value) => (typeof value === "number" ? [value] : value))
    .catch([]),
  limit: z
    .string()
    .refine(
      (value) =>
        value === "no-limit" || (Number.isInteger(+value) && +value > 0)
    )
    .catch("no-limit"),
})

async function RetakePage({ params, searchParams }: Props) {
  const { testId } = params
  const { limit, section, testHistoryId } =
    retakeSearchParamsSchema.parse(searchParams)

  if (testHistoryId === "") return notFound()

  const { test, testGrades } = await getRetakeTest({
    testId,
    section: section,
    testHistoryId,
  })

  console.log({ section })

  if (!test || test.testSections.length === 0) return notFound()

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <EscapeDialog testId={test.id} />
      </div>
      <div className="flex flex-1 gap-4">
        <TestPaper test={test} />
        <AnswerProgress
          testGrades={testGrades}
          testId={test.id}
          limit={limit}
        />
      </div>
    </div>
  )
}

export default RetakePage
