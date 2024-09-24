import React from "react"
import { useTranslations } from "next-intl"

import { cn, indexToAlphabet } from "@/lib/utils"
import { type AnswerTranscript } from "@/hooks/use-answer-transcript"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Props = { answerTranscript: AnswerTranscript }

function QuestionContent({ answerTranscript }: Props) {
  const testGrade = answerTranscript.testGrades[0]
  const isMultipleChoice = !!testGrade.question.isMultipleChoice //TODO: fix this on api fixed
  const t = useTranslations("TestResultPage")

  if (isMultipleChoice)
    return (
      <div className="flex gap-x-4 p-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {testGrade.questionNumber}
        </div>
        <div className="flex flex-col gap-y-2">
          <div>{testGrade.question.questionDesc}</div>
          <RadioGroup disabled className="flex flex-col gap-y-2">
            {testGrade.question.questionAnswers?.map((a, i) => {
              return (
                <div
                  key={a.questionAnswerId}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    checked={testGrade.inputedAnswer === indexToAlphabet(i)}
                    value={indexToAlphabet(i)}
                    id={a.questionAnswerId.toString()}
                  />
                  <Label>
                    {indexToAlphabet(i)}. {a.answerText}
                  </Label>

                  {testGrade.inputedAnswer === indexToAlphabet(i) &&
                    testGrade.gradeStatus === "Correct" && (
                      <Icons.Check className="size-4 text-success" />
                    )}

                  {testGrade.inputedAnswer === indexToAlphabet(i) &&
                    testGrade.gradeStatus === "Wrong" && (
                      <Icons.X className="size-4 text-danger" />
                    )}
                </div>
              )
            })}
          </RadioGroup>
          {testGrade.gradeStatus !== "Correct" && (
            <div className="font-medium text-success">
              {t("RightAnswer2", { rightAnswer: testGrade.rightAnswer })}
            </div>
          )}
        </div>
      </div>
    )

  return (
    <div className="flex gap-x-4 p-3">
      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {testGrade.questionNumber}
      </div>
      <div className="flex flex-col gap-y-2">
        {testGrade?.question?.questionDesc && (
          <p className="font-medium">{testGrade.question.questionDesc}</p>
        )}

        <div className="flex items-center gap-3">
          <Input
            disabled
            className={cn(
              "w-full",
              testGrade.gradeStatus === "Correct"
                ? "border-success"
                : testGrade.gradeStatus === "Wrong"
                  ? "border-danger"
                  : "border-skip"
            )}
            value={testGrade.inputedAnswer || ""}
          />

          {testGrade.gradeStatus === "Correct" && (
            <Icons.Check className="size-4 text-success" />
          )}

          {testGrade.gradeStatus === "Wrong" && (
            <Icons.X className="size-4 text-danger" />
          )}

          {testGrade.gradeStatus === "Skip" && (
            <Icons.Slash className="size-4 text-skip" />
          )}
        </div>
        {testGrade.gradeStatus !== "Correct" && (
          <div className="font-medium text-success">
            {t("RightAnswer2", { rightAnswer: testGrade.rightAnswer })}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionContent
