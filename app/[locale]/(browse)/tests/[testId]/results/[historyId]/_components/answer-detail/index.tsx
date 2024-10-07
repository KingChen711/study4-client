import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import { type SectionHistory } from "@/queries/test/get-history"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import AnswerDialog from "./answer-dialog"

type Props = {
  sections: SectionHistory[]
  testId: number
  testHistoryId: number
}

const AnswerDetail = async ({ sections, testId, testHistoryId }: Props) => {
  const t = await getTranslations("TestResultPage")

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="my-2 text-xl font-bold">{t("Answers")}</h3>
        <Button size="sm" variant="outline" asChild>
          <Link
            href={`/tests/${testId}/results/${testHistoryId}/answer-detail`}
          >
            {t("ViewAnswerDetail")}
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link
            href={`/tests/${testId}/retake?${sections.map((section) => `section=${section.testSectionId}&`).join("")}&testHistoryId=${testHistoryId}`}
          >
            {t("Retake")}
          </Link>
        </Button>
      </div>
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
                        ? t("NotAnswered")
                        : tg.inputedAnswer}
                    </div>

                    {tg.gradeStatus === "Correct" && (
                      <Icons.Check className="size-4 text-success" />
                    )}
                    {tg.gradeStatus === "Wrong" && (
                      <Icons.X className="size-3 text-danger" />
                    )}
                    {tg.gradeStatus === "Skip" && (
                      <Icons.Slash className="size-3 text-skip" />
                    )}

                    <AnswerDialog
                      gradeId={tg.testGradeId}
                      partitionId={tg.partitionHistoryId}
                      transcript={section.transcript || undefined}
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
