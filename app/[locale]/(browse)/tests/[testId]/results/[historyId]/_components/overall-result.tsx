import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import { type TestHistory } from "@/queries/test/get-history"
import { Clock, Percent } from "lucide-react"

import { cn, convertSecondToText } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  testHistory: TestHistory
  testId: number
  testName: string
  isResubmitted: boolean
}

async function OverallResult({
  testHistory,
  testId,
  testName,
  isResubmitted,
}: Props) {
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
      {/* <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col justify-center gap-y-2 rounded-xl border bg-muted p-4 shadow-lg xl:col-span-4">
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

        <div className="col-span-12 grid grid-cols-12 gap-4 xl:col-span-8">
          <div
            className={cn(
              "col-span-12 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg sm:col-span-6 lg:col-span-3",
              isResubmitted && "sm:col-span-12 md:col-span-4 lg:col-span-4"
            )}
          >
            <Icons.Correct className="size-5 text-success" />
            <div className="mt-1 font-bold text-success">
              {t("RightAnswer")}
            </div>
            <div className="text-lg font-bold">
              {testHistory.totalRightAnswer}
            </div>
            <div>{t("Question")}</div>
          </div>
          <div
            className={cn(
              "col-span-12 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg sm:col-span-6 lg:col-span-3",
              isResubmitted && "sm:col-span-12 md:col-span-4 lg:col-span-4"
            )}
          >
            <Icons.Wrong className="size-5 text-danger" />
            <div className="mt-1 font-bold text-danger">{t("WrongAnswer")}</div>
            <div className="text-lg font-bold">
              {testHistory.totalWrongAnswer}
            </div>
            <div>{t("Question")}</div>
          </div>
          <div
            className={cn(
              "col-span-12 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg sm:col-span-6 lg:col-span-3",
              isResubmitted && "sm:col-span-12 md:col-span-4 lg:col-span-4"
            )}
          >
            <Icons.Skip className="size-5 text-neutral-600" />
            <div className="mt-1 font-bold text-neutral-600">
              {t("SkipAnswer")}
            </div>
            <div className="text-lg font-bold">
              {testHistory.totalSkipAnswer}
            </div>
            <div>{t("Question")}</div>
          </div>

          {!isResubmitted && (
            <div className="col-span-12 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg sm:col-span-6 lg:col-span-3">
              <Icons.BandScore className="size-5" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("BandScore")}
              </div>
              <div className="text-lg font-bold">{testHistory.bandScore}</div>
              <div>{t("Score")}</div>
            </div>
          )}
        </div>
      </div> */}

      <div
        className={cn(
          "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
          !isResubmitted && "lg:grid-cols-5"
        )}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("Result")}</CardTitle>
            <Icons.Target2 className="size-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${testHistory.totalRightAnswer}/${testHistory.totalQuestion}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("Accurate")}
            </CardTitle>
            <Percent className="size-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(testHistory.accuracyRate * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("CompletionTime")}
            </CardTitle>
            <Clock className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {convertSecondToText(testHistory.totalCompletionTime)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("BandScore")}
            </CardTitle>
            <Icons.BandScore className="size-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testHistory.bandScore}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("AnswerSummary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-[6px] flex justify-between">
              <span className="flex items-center">
                <Icons.Correct className="mr-1 size-5 text-green-500" />{" "}
                {testHistory.totalRightAnswer}
              </span>
              <span className="flex items-center">
                <Icons.Wrong className="mr-1 size-5 text-red-500" />{" "}
                {testHistory.totalWrongAnswer}
              </span>
              <span className="flex items-center">
                <Icons.Skip className="mr-1 size-5 text-gray-500" />{" "}
                {testHistory.totalSkipAnswer}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default OverallResult

export function OverallResultSkeleton() {
  return (
    <>
      <Skeleton className="h-9 w-full max-w-[900px]" />
      <div className="flex justify-between">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex flex-col justify-center gap-y-2 rounded-xl border bg-muted p-4 shadow-lg xl:col-span-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="col-span-12 h-[138px] rounded-xl shadow-lg sm:col-span-6 lg:col-span-3 xl:col-span-2" />
        <div className="col-span-12 h-[138px] rounded-xl shadow-lg sm:col-span-6 lg:col-span-3 xl:col-span-2" />
        <div className="col-span-12 h-[138px] rounded-xl shadow-lg sm:col-span-6 lg:col-span-3 xl:col-span-2" />
        <div className="col-span-12 h-[138px] rounded-xl shadow-lg sm:col-span-6 lg:col-span-3 xl:col-span-2" />
      </div>
    </>
  )
}
