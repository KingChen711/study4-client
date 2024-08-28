import React from "react"
import { type Partition } from "@/queries/test/get-practice-test"

import { cn } from "@/lib/utils"

import PartitionContent from "./partition-content"
import QuestionContent from "./question-content"

type Props = {
  havePassage: boolean
  partitions: Partition[]
}

function Partitions({ havePassage, partitions }: Props) {
  return (
    <div
      className={cn(
        "col-span-12 flex flex-col gap-y-4 xl:col-span-5",
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
              "col-span-12 flex flex-col gap-y-4 xl:col-span-5",
              (havePassage || partition.isVerticalLayout) && "xl:col-span-12"
            )}
          >
            {partition.questions.map((question) => (
              <QuestionContent key={question.questionId} question={question} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Partitions
