"use client"

import React, { useCallback, useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import { type TestGrade } from "@/queries/test/get-retake-test"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers, type Answer } from "@/stores/use-submit-answers"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { cn, convertSecondToText, newDate } from "@/lib/utils"
import { resubmitTest } from "@/actions/do-test/resubmit-test"
import { submitTest } from "@/actions/do-test/submit-test"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  limit: string
  testId: number
  isFullTest?: boolean
  testGrades?: TestGrade[]
  retake?: boolean
  testHistoryId?: number
  showAnswer?: boolean
}

function AnswerProgress({
  limit,
  testId,
  isFullTest = false,
  testGrades,
  retake = false,
  testHistoryId,
  showAnswer = false,
}: Props) {
  const { getAnswersEachSection, answers } = useSubmitAnswers()
  const [time, setTime] = useState<number>(0)
  const t = useTranslations("DoTestPage")
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleNavigateQuestion = (answer: Answer) => {
    useHighlightQuestion.getState().highlightQuestion({
      questionId: answer.questionId,
      sectionName: answer.sectionName,
    })
  }

  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      const res = !retake
        ? await submitTest({
            isFull: isFullTest,
            testId,
            totalCompletionTime: time,
            takenDateTime: newDate(),
            questionAnswers: Object.values(answers).map((a) => ({
              questionId: a.questionId,
              selectedAnswer: a.selectedAnswer,
            })),
          })
        : await resubmitTest({
            testId,
            testHistoryId: testHistoryId!,
            totalCompletionTime: time,
            takenDateTime: newDate(),
            testGrades: Object.values(answers).map((a) => ({
              questionId: a.questionId,
              inputedAnswer: a.selectedAnswer,
            })),
          })

      if (res.isSuccess) {
        router.push(`/tests/${testId}`)
        return
      }

      //i18n
      toast.error(UNKNOWN_ERROR_MESSAGE)
    })
  }, [answers, isFullTest, router, testId, time, retake, testHistoryId])

  useEffect(() => {
    function updateTime() {
      if (pending) return
      setTime((prev) => prev + 1)
    }

    const timer = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [limit, pending])

  useEffect(() => {
    if (!isFullTest || pending || time < +limit * 60) return
    handleSubmit()
  }, [pending, isFullTest, time, limit, handleSubmit])

  return (
    <div className="relative w-52">
      <div className="sticky top-24 rounded-lg border p-4">
        {!showAnswer && (
          <>
            <h4 className="font-medium">{t("CompleteTime")}</h4>
            <p
              className={cn(
                "mb-2 mt-1 line-clamp-1 text-xl font-bold",
                limit !== "no-limit" && +limit * 60 <= time && "text-danger"
              )}
            >
              {convertSecondToText(
                limit === "no-limit" ? time : Math.max(0, +limit * 60 - time)
              )}
            </p>

            {!isFullTest && limit !== "no-limit" && +limit * 60 <= time && (
              <p className="mb-2 text-balance rounded-lg border bg-muted p-2 text-sm font-medium text-danger">
                {t("OverTimeMessage")}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              variant="outline"
              className="w-full uppercase"
              disabled={pending}
            >
              {t("Submit")}{" "}
              {pending && <Icons.Loader className="ml-1 size-4" />}
            </Button>
          </>
        )}

        <div className={cn("mt-6 flex flex-col gap-y-4", showAnswer && "mt-0")}>
          {Object.entries(getAnswersEachSection()).map((e) => {
            const sectionName = e[0]
            const answers = e[1]

            return (
              <div key={sectionName} className="flex flex-col gap-y-2">
                <h5 className="font-bold">{sectionName}</h5>
                <div className="flex flex-wrap gap-2">
                  {answers.map((answer) => {
                    const testGrade = testGrades?.find(
                      (tg) => tg.questionNumber === answer.questionNumber
                    )
                    return (
                      <Button
                        onClick={() => handleNavigateQuestion(answer)}
                        key={answer.questionId}
                        variant="outline"
                        size="icon"
                        className={cn(
                          "size-7 border-[3px] bg-transparent text-xs",
                          testGrade &&
                            testGrade.gradeStatus === "Wrong" &&
                            "border-danger bg-danger-100",
                          answer.selectedAnswer &&
                            "bg-primary text-primary-foreground"
                        )}
                      >
                        {answer.questionNumber}
                      </Button>
                    )
                  })}
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
