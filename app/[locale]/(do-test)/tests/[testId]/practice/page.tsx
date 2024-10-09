import React from "react"
import { notFound } from "next/navigation"
import getPracticeTest from "@/queries/test/get-practice-test"
import { z } from "zod"

import Logo from "@/app/[locale]/(browse)/_components/header/logo"

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

async function PracticePage({ params, searchParams }: Props) {
  const { testId } = params
  const { limit, section } = practiceSearchParamsSchema.parse(searchParams)

  const test = await getPracticeTest({ testId, section: section })

  if (!test || test.testSections.length === 0) return notFound()

  return (
    <div className="relative flex h-screen flex-col">
      <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-between gap-3 bg-card px-6 py-4">
        <div className="flex-1">
          <Logo />
        </div>
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <div className="flex flex-1 justify-end">
          <EscapeDialog testId={test.id} />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-1 gap-4 bg-[#f2f4f7] px-2 pb-[128px] pt-[76px]">
        <TestPaper test={test} />
      </div>
      <AnswerProgress testId={test.id} limit={limit} />
    </div>
  )
}

export default PracticePage
