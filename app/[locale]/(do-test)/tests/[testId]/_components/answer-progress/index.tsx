"use client"

import React from "react"
import { useHighlightQuestion } from "@/stores/use-hightlight-question"
import { useSubmitAnswers, type Answer } from "@/stores/use-submit-answers"

import { Button } from "@/components/ui/button"

type Props = {
  limit: string
}

function AnswerProgress({ limit }: Props) {
  const { getAnswersEachSection } = useSubmitAnswers()
  const { highlightQuestion } = useHighlightQuestion()

  const handleNavigateQuestion = (answer: Answer) => {
    highlightQuestion({
      questionId: answer.questionId,
      sectionId: answer.sectionId,
      sectionName: answer.sectionName,
    })
  }

  console.log({ limit })

  return (
    <div className="relative w-52">
      <div className="sticky top-24 rounded-lg border p-4">
        <h4 className="font-medium">Thời gian làm bài:</h4>
        <p className="mb-4 mt-1 text-xl font-bold">1:23:46</p>
        <Button variant="outline" className="w-full uppercase">
          Nộp bài
        </Button>

        <div className="mt-6 flex flex-col gap-y-4">
          {Object.entries(getAnswersEachSection()).map((e) => {
            const sectionName = e[0]
            const answers = e[1]

            return (
              <div key={sectionName} className="flex flex-col gap-y-2">
                <h5 className="font-bold">{sectionName}</h5>
                <div className="flex flex-wrap gap-2">
                  {answers.map((answer) => (
                    <Button
                      onClick={() => handleNavigateQuestion(answer)}
                      key={answer.questionId}
                      variant={answer.selectedAnswer ? "default" : "outline"}
                      size="icon"
                      className="size-7 text-xs"
                    >
                      {answer.questionNumber}
                    </Button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AnswerProgress
