import React from "react"
import { notFound } from "next/navigation"
import getFullTest from "@/queries/test/get-full-test"

import Logo from "@/app/[locale]/(browse)/_components/header/logo"

import AnswerProgress from "../_components/answer-progress"
import EscapeDialog from "../_components/escape-dialog"
import TestPaper from "../_components/test-paper"

type Props = {
  params: {
    testId: string
  }
}

//TODO:auto submit on deadline
async function FullTestPage({ params }: Props) {
  const { testId } = params

  const test = await getFullTest({ testId })

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
      <div className="mx-auto flex h-screen w-full flex-1 gap-4 bg-[#f2f4f7] px-2 pb-[128px] pt-[76px]">
        <TestPaper test={test} />
      </div>
      <AnswerProgress
        isFullTest
        testId={test.id}
        limit={Math.round(test.duration / 60).toString()}
      />
    </div>
  )
}

export default FullTestPage
