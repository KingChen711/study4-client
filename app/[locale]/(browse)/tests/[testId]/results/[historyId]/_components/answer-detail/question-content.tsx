import React from "react"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import { type Question } from "@/types/do-test"
import { cn, indexToAlphabet } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = { question: Question }

function QuestionContent({ question }: Props) {
  const { answers, patchAnswer } = useSubmitAnswers()
  const { highlightedQuestion } = useHighlightQuestion()

  const handleChangeAnswer = (value: string, questionId: number) => {
    patchAnswer({
      questionId,
      value,
    })
  }

  if (question.isMultipleChoice)
    return (
      <div
        key={question.questionId}
        className={cn(
          "flex gap-x-4 p-3",
          highlightedQuestion?.questionId === question.questionId &&
            "rounded-lg border-2 border-primary shadow shadow-primary"
        )}
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {question.questionNumber}
        </div>
        <div className="flex flex-col gap-y-2">
          <div>{question.questionDesc}</div>
          <RadioGroup
            onValueChange={(value) =>
              handleChangeAnswer(value, question.questionId)
            }
            className="flex flex-col gap-y-2"
          >
            {question.questionAnswers?.map((a, i) => {
              return (
                <div
                  key={a.questionAnswerId}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    checked={
                      answers[question.questionId]?.selectedAnswer ===
                      indexToAlphabet(i)
                    }
                    value={indexToAlphabet(i)}
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
    <div
      key={question.questionId}
      className={cn(
        "flex gap-x-4 p-3",
        highlightedQuestion?.questionId === question.questionId &&
          "rounded-lg border-2 border-primary shadow shadow-primary"
      )}
    >
      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {question.questionNumber}
      </div>
      <div className="flex flex-col gap-y-2">
        {question.questionDesc && (
          <p className="font-medium">{question.questionDesc}</p>
        )}

        <Input
          value={answers[question.questionId]?.selectedAnswer || ""}
          onChange={(e) =>
            handleChangeAnswer(e.target.value, question.questionId)
          }
          className="w-full"
        />
      </div>
    </div>
  )
}

export default QuestionContent
