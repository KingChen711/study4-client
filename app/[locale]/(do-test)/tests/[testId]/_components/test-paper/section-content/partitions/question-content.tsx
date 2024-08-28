import React from "react"
import { type Question } from "@/queries/test/get-practice-test"

import { indexToAlphabet } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = { question: Question }

function QuestionContent({ question }: Props) {
  if (question.isMultipleChoice)
    return (
      <div key={question.questionId} className="flex gap-x-4">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {question.questionNumber}
        </div>
        <div className="flex flex-col gap-y-2">
          <div>{question.questionDesc}</div>
          <RadioGroup className="flex flex-col gap-y-2">
            {question.questionAnswers?.map((a, i) => {
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
                    {indexToAlphabet(i)}. {a.answerText}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>
        </div>
      </div>
    )

  return (
    <div key={question.questionId} className="flex items-center gap-x-4">
      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {question.questionNumber}
      </div>
      <Input className="flex-1" />
    </div>
  )
}

export default QuestionContent
