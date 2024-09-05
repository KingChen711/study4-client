import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import { type TestHistory } from "@/queries/test/get-history"

import { convertSecondToText } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  testHistory: TestHistory
  testId: number
  testName: string
}

async function OverallResult({ testHistory, testId, testName }: Props) {
  const t = await getTranslations("TestResultPage")

  return (
    <>
      <h2 className="line-clamp-2 text-3xl font-bold">
        {t("TestResult", { testName })}
      </h2>
      <div className="flex justify-between">
        <h3 className="mt-2 text-xl font-bold">{t("Overall")}</h3>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/tests/${testId}`}>{t("BackToTest")}</Link>
        </Button>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-4 flex flex-col justify-center gap-y-2 rounded-xl border bg-muted p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <Icons.Check className="size-4" />
            <div>{t("Result")}</div>
            <div>
              {`${testHistory.totalRightAnswer}/${testHistory.totalQuestion}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Target2 className="size-4 text-foreground" />
            <div>{t("Accurate")}</div>
            <div>{(testHistory.accuracyRate * 100).toFixed(1)}%</div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Time className="size-4" />
            <div>{t("CompletionTime")}</div>
            <div>{convertSecondToText(testHistory.totalCompletionTime)}</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Correct className="size-6 text-success" />
          <div className="mt-1 font-bold text-success">{t("RightAnswer")}</div>
          <div className="text-lg font-bold">
            {testHistory.totalRightAnswer}
          </div>
          <div>{t("Question")}</div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Wrong className="size-6 text-danger" />
          <div className="mt-1 font-bold text-danger">{t("WrongAnswer")}</div>
          <div className="text-lg font-bold">
            {testHistory.totalWrongAnswer}
          </div>
          <div>{t("Question")}</div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Skip className="size-6 text-neutral-600" />
          <div className="mt-1 font-bold text-neutral-600">
            {t("SkipAnswer")}
          </div>
          <div className="text-lg font-bold">{testHistory.totalSkipAnswer}</div>
          <div>{t("Question")}</div>
        </div>
      </div>
    </>
  )
}

export default OverallResult

export function OverallResultSkeleton() {
  return <div>OverallResultSkeleton</div>
}
