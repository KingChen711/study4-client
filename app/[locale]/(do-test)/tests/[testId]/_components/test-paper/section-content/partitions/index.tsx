import React from "react"
import { practiceTest } from "@/constants"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = {
  havePassage: boolean
}

function Partitions({ havePassage }: Props) {
  const partitions = practiceTest.testSections[1].testSectionPartitions

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
          <div
            className={cn(
              "col-span-12 rounded-md bg-input p-3 xl:col-span-7",
              (havePassage || partition.isVerticalLayout) && "xl:col-span-12"
            )}
          >
            {partition.partitionDesc}
          </div>
          <div
            className={cn(
              "col-span-12 flex flex-col gap-y-4 xl:col-span-5",
              (havePassage || partition.isVerticalLayout) && "xl:col-span-12"
            )}
          >
            {partition.questions.map((question) => {
              if (question.isMultipleChoice)
                return (
                  <div key={question.questionId} className="flex gap-x-4">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {question.questionNumber}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <div>{question.questionDesc}</div>
                      <RadioGroup className="flex flex-col gap-y-2">
                        {question.questionAnswers?.map((a) => {
                          return (
                            <div
                              key={a.questionAnswerId}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={a.questionAnswerId.toString()}
                                id={a.questionAnswerId.toString()}
                              />
                              <Label htmlFor={a.questionAnswerId.toString()}>
                                {a.answerText}
                              </Label>
                            </div>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  </div>
                )

              return (
                <div
                  key={question.questionId}
                  className="flex items-center gap-x-4"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {question.questionNumber}
                  </div>
                  <Input className="flex-1" />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Partitions
