import React from "react"
import { notFound } from "next/navigation"
import getPracticeTest from "@/queries/test/get-practice-test"
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

const practiceSearchParamsSchema = z.object({
  section: z.array(z.coerce.number()).catch([]),
  limit: z
    .string()
    .refine(
      (value) =>
        value === "no-limit" || (Number.isInteger(+value) && +value > 0)
    )
    .catch("no-limit"),
})

async function PracticePage({ params, searchParams }: Props) {
  const { testId } = params
  const { limit, section } = practiceSearchParamsSchema.parse(searchParams)

  const test = await getPracticeTest({ testId, section })

  if (!test || test.testSections.length === 0) return notFound()

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <EscapeDialog testId={test.id} />
      </div>
      <div className="flex flex-1 gap-4">
        <TestPaper test={test} />
        <AnswerProgress testId={test.id} limit={limit} />
      </div>
    </div>
  )
}

export default PracticePage
