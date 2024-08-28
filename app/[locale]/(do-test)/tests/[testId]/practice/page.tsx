import React from "react"
import { practiceTest } from "@/constants"

import { Button } from "@/components/ui/button"

import EscapeDialog from "../_components/escape-dialog"

type Props = {
  params: {
    testId: string
  }
  searchParams: {
    section: string[]
    limit: string
  }
}

function PracticePage({ params, searchParams }: Props) {
  const { testId } = params
  const { limit, section } = searchParams
  const test = practiceTest

  console.log({ testId, limit, section })
  //TODO:test not found

  return (
    <div className="flex flex-col">
      <div className="my-4 flex items-center justify-center gap-3">
        <h2 className="text-xl font-bold">{test.testTitle}</h2>
        <EscapeDialog testId={test.id} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10 flex flex-col gap-y-4 rounded-lg border bg-card">
          <div className="size-96 bg-green-500"></div>
          <div className="size-96 bg-green-500"></div>
          <div className="size-96 bg-green-500"></div>
          <div className="size-96 bg-green-500"></div>
          <div className="size-96 bg-green-500"></div>
        </div>
        <div className="relative col-span-2">
          <div className="sticky top-24 h-96 rounded-lg border bg-red-500"></div>
        </div>
      </div>
    </div>
  )
}

export default PracticePage
