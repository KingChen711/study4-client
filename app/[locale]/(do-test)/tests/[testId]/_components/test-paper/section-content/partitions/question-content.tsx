import React from "react"
import { type TestGrade } from "@/queries/test/get-history"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import { type Question } from "@/types/do-test"
import { cn, indexToAlphabet } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = { question: Question; showAnswer?: boolean; testGrade?: TestGrade }

function QuestionContent({ question, showAnswer = false, testGrade }: Props) {
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
      <>
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
              disabled={showAnswer}
            >
              {question.questionAnswers?.map((a, i) => {
                return (
                  <div
                    key={a.questionAnswerId}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      disabled={showAnswer}
                      checked={
                        showAnswer
                          ? testGrade?.inputedAnswer === indexToAlphabet(i)
                          : answers[question.questionId]?.selectedAnswer ===
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
        {showAnswer && testGrade && (
          <div className="pl-16 text-success">
            Đáp án đúng: {testGrade.rightAnswer}
          </div>
        )}
      </>
    )

  return (
    <>
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
            disabled={showAnswer}
            value={
              showAnswer
                ? testGrade?.inputedAnswer
                : answers[question.questionId]?.selectedAnswer || ""
            }
            onChange={(e) =>
              handleChangeAnswer(e.target.value, question.questionId)
            }
            className={cn(
              "w-full",
              showAnswer &&
                testGrade?.gradeStatus === "Correct" &&
                "border-success",
              showAnswer &&
                testGrade?.gradeStatus === "Wrong" &&
                "border-danger",
              showAnswer && testGrade?.gradeStatus === "Skip" && "border-skip"
            )}
          />
        </div>
      </div>
      {showAnswer && testGrade && (
        <div className="pl-16 text-success">
          Đáp án đúng: {testGrade.rightAnswer}
        </div>
      )}
    </>
  )
}

export default QuestionContent
