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
}

const AnswerDetail = async ({ sections }: Props) => {
  const t = await getTranslations("TestResultPage")

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  //   startTransition(() => {
  //     router.push(
  //       `/tests/${testId}/practice?` +
  //         selectedSectionIds.map((id) => `section=${id}&`).join("") +
  //         `limit=${limitTimeStates.value}`
  //     )
  //   })
  // }
  // href={`/tests/${testId}/retake?${sections.map((section) => `section=${section.}&`).join("")}`}

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="my-2 text-xl font-bold">Đáp án</h3>
        <Button size="sm" variant="outline" asChild>
          <Link href="#">Làm lại các câu sai</Link>
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
