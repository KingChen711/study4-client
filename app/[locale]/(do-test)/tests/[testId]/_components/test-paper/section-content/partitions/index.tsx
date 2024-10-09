import React from "react"
import { type TestGrade } from "@/queries/test/get-history"

import { type Partition } from "@/types/do-test"
import { cn } from "@/lib/utils"

import PartitionContent from "./partition-content"
import QuestionContent from "./question-content"

type Props = {
  havePassage: boolean
  partitions: Partition[]
  showAnswer?: boolean
  testGrades?: TestGrade[]
}

function Partitions({
  havePassage,
  partitions,
  showAnswer,
  testGrades,
}: Props) {
  return (
    <div
      className={cn(
        "col-span-12 flex flex-col gap-y-4 overflow-y-auto xl:col-span-5",
        !havePassage && "xl:col-span-12"
      )}
    >
      {partitions.map((partition) => (
        <div
          key={partition.testSectionPartId}
          className="grid grid-cols-12 gap-4"
        >
          <PartitionContent
            havePassage={havePassage}
            isVerticalLayout={partition.isVerticalLayout}
            partitionDesc={partition.partitionDesc}
          />
          <div
            className={cn(
              "col-span-12 flex flex-col xl:col-span-5",
              (havePassage || partition.isVerticalLayout) && "xl:col-span-12"
            )}
          >
            {partition.questions.map((question) => (
              <QuestionContent
                showAnswer={showAnswer}
                testGrade={testGrades?.find(
                  (tg) => tg.questionId === question.questionId
                )}
                key={question.questionId}
                question={question}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Partitions
