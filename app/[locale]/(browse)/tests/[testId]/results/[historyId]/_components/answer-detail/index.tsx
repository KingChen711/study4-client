import React from "react"
import { type SectionHistory } from "@/queries/test/get-history"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

import AnswerDialog from "./answer-dialog"

type Props = {
  sections: SectionHistory[]
}

const AnswerDetail = ({ sections }: Props) => {
  return (
    <div className="flex flex-col gap-y-4">
      {sections.map((section) => (
        <div key={section.sectionName}>
          <h4 className="mb-2 font-bold">{section.sectionName}</h4>
          <div className="gap-x-4 gap-y-2 lg:columns-2">
            {section.partitionHistories
              .flatMap((ph) => ph.testGrades)
              .map((tg) => {
                return (
                  <div
                    key={tg.questionId}
                    className="mb-2 flex flex-wrap items-center gap-2"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      {tg.questionNumber}
                    </div>
                    <div className="font-medium uppercase text-primary">
                      {tg.rightAnswer}:
                    </div>
                    <div
                      className={cn(
                        tg.gradeStatus === "Wrong" && "line-through"
                      )}
                    >
                      {tg.gradeStatus === "Skip"
                        ? "chưa trả lời"
                        : tg.inputedAnswer}
                    </div>
                    {tg.gradeStatus === "Correct" && (
                      <Icons.Check className="size-3 text-primary" />
                    )}
                    {tg.gradeStatus === "Wrong" && (
                      <Icons.X className="size-3 text-red-500" />
                    )}

                    <AnswerDialog
                      gradeId={tg.testGradeId}
                      partitionId={tg.partitionHistoryId}
                    />
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnswerDetail
