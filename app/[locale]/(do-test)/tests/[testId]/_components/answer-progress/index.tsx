"use client"

import React, { useEffect, useState } from "react"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers, type Answer } from "@/stores/use-submit-answers"
import { useTranslations } from "next-intl"

import { cn, convertSecondToText } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Props = {
  limit: string
}

function AnswerProgress({ limit }: Props) {
  const { getAnswersEachSection } = useSubmitAnswers()
  const [time, setTime] = useState<number>(0)
  const t = useTranslations("DoTestPage")

  const handleNavigateQuestion = (answer: Answer) => {
    useHighlightQuestion.getState().highlightQuestion({
      questionId: answer.questionId,
      sectionName: answer.sectionName,
    })
  }

  useEffect(() => {
    function updateTime() {
      setTime((prev) => prev + 1)
    }

    const timer = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [limit])

  console.log(time)

  return (
    <div className="relative w-52">
      <div className="sticky top-24 rounded-lg border p-4">
        <h4 className="font-medium">{t("CompleteTime")}</h4>
        <p
          className={cn(
            "mb-2 mt-1 line-clamp-1 text-xl font-bold",
            limit !== "no-limit" && +limit * 60 <= time && "text-red-500"
          )}
        >
          {convertSecondToText(
            limit === "no-limit" ? time : Math.max(0, +limit * 60 - time)
          )}
        </p>

        {limit !== "no-limit" && +limit * 60 <= time && (
          <p className="mb-2 text-balance rounded-lg border bg-muted p-2 text-sm font-medium text-red-500">
            {t("OverTimeMessage")}
          </p>
        )}

        <Button variant="outline" className="w-full uppercase">
          {t("Submit")}
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
