"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, ChevronsUpDown, LightbulbIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { z } from "zod"

import { cn, convertSecondToText, toDate } from "@/lib/utils"
import useAnalytics from "@/hooks/use-analytics"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import NoResult from "@/components/ui/no-result"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const timeItems = [
  {
    label: "3 ngày gần nhất",
    value: "3D",
  },
  {
    label: "7 ngày gần nhất",
    value: "7D",
  },
  {
    label: "30 ngày",
    value: "1M",
  },
  {
    label: "60 ngày",
    value: "2M",
  },
  {
    label: "90 ngày",
    value: "3M",
  },
  {
    label: "6 tháng",
    value: "6T",
  },
  {
    label: "1 năm",
    value: "1Y",
  },
]

const analyticsPageParamsSchema = z.object({
  qDays: z.enum(["3D", "7D", "1M", "2M", "3M", "6T", "1Y"]).catch("3D"),
})

function AnalyticsPage() {
  const searchParams = useSearchParams()
  const { qDays = "3D" } = analyticsPageParamsSchema.parse({
    qDays: searchParams.get("qDays"),
  })

  const { data: analytics, isPending } = useAnalytics(qDays)
  const [categoryAnalyticIndex, setCategoryAnalyticIndex] = useState(0)
  const t = useTranslations("AnalyticsPage")
  const [testTypeAnalyticIndex, setTestTypeAnalyticIndex] = useState(0)
  const [sectionIndex, setSectionIndex] = useState(0)

  if (isPending)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">
        {t("PracticeResultAnalytics")}
      </h2>

      <div className="mb-6 flex">
        {analytics?.testCategoryAnalytics.map((tca, i) => (
          <div
            key={tca.testCategoryName}
            className={cn(
              "border-b-2 border-transparent p-4 font-medium",
              i === categoryAnalyticIndex &&
                "border-primary font-bold text-primary"
            )}
            onClick={() => {
              setCategoryAnalyticIndex(i)
              setTestTypeAnalyticIndex(0)
              setSectionIndex(0)
            }}
          >
            {tca.testCategoryName}
          </div>
        ))}
      </div>

      <Alert className="h-fit w-full border-success">
        <LightbulbIcon className="size-4 stroke-success" />
        <AlertTitle className="font-semibold text-success">
          Pro tips:
        </AlertTitle>
        <AlertDescription className="font-medium text-success">
          {t("ProTips")}
        </AlertDescription>
      </Alert>

      <h2 className="mb-2 mt-4">{t("FilterByDays")}</h2>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >
            {qDays
              ? timeItems.find((item) => item.value === qDays)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {timeItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} asChild>
                    <Link href={`/analytics?qDays=${item.value}`}>
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          qDays === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {!analytics && <NoResult title="Not found any " />}

      {analytics && (
        <>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <Icons.Test className="size-6" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("TotalPracticeTests")}
              </div>
              <div className="text-lg font-bold">
                {
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.totalTestEngaged
                }
              </div>
              <div>{t("tests")}</div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <Icons.Time className="size-6" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("TotalPracticeTime")}
              </div>
              <div className="text-lg font-bold">
                {Math.round(
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.totalPracticeTime / 60
                )}
              </div>
              <div>{t("minutes")}</div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <Icons.Calendar className="size-6" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("TakenTestDate")}
              </div>
              <div className="text-lg font-bold">
                {analytics.testCategoryAnalytics[categoryAnalyticIndex]
                  .testAnalytics.testTakenDate &&
                  toDate(
                    analytics.testCategoryAnalytics[categoryAnalyticIndex]
                      .testAnalytics.testTakenDate
                  )}
              </div>
              <div></div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <Icons.ToTestDate className="size-6" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("ToTheTestDate")}
              </div>
              <div className="text-lg font-bold">
                {analytics.testCategoryAnalytics[categoryAnalyticIndex]
                  .testAnalytics.testTakenDate &&
                  Math.max(
                    0,
                    Math.round(
                      (new Date(
                        analytics.testCategoryAnalytics[
                          categoryAnalyticIndex
                        ].testAnalytics.testTakenDate
                      ).getTime() -
                        Date.now()) /
                        (1000 * 60 * 60 * 24)
                    )
                  )}
              </div>
              <div>{t("days")}</div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <Icons.Target2 className="size-6" />
              <div className="mt-1 font-bold text-neutral-600">
                {t("TargetScore")}
              </div>
              <div className="text-lg font-bold">
                {
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.targetScore
                }
              </div>
              <div>{t("scores")}</div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-x-4">
            {analytics.testCategoryAnalytics[
              categoryAnalyticIndex
            ].testAnalytics.testTypeAnalytics.map((ta, i) => (
              <div
                key={ta.testType}
                className={cn(
                  "cursor-pointer rounded-xl border bg-muted px-4 py-1",
                  i === testTypeAnalyticIndex &&
                    "border-none bg-primary/10 font-medium text-primary"
                )}
                onClick={() => {
                  setTestTypeAnalyticIndex(i)
                  setSectionIndex(0)
                }}
              >
                {ta.testType}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <div className="mt-1 font-bold text-neutral-600">
                {t("TotalPracticeTests")}
              </div>
              <div className="text-lg font-bold">
                {
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.testTypeAnalytics[testTypeAnalyticIndex]
                    .totalTestEngaged
                }
              </div>
              <div>{t("tests")}</div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <div className="mt-1 font-bold text-neutral-600">
                {t("Accuracy")}
              </div>
              <div className="text-lg font-bold">
                {`${
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.testTypeAnalytics[testTypeAnalyticIndex]
                    .averageAccuracyRate
                }%`}
              </div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <div className="mt-1 font-bold text-neutral-600">
                {t("AverageTime")}
              </div>
              <div className="text-lg font-bold">
                {convertSecondToText(
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.testTypeAnalytics[testTypeAnalyticIndex]
                    .averagePracticeTime
                )}
              </div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <div className="mt-1 font-bold text-neutral-600">
                {t("AverageScore")}
              </div>
              <div className="text-lg font-bold">
                {`${
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.testTypeAnalytics[testTypeAnalyticIndex]
                    .averageScore
                }/9.0
                `}
              </div>
            </div>
            <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
              <div className="mt-1 font-bold text-neutral-600">
                {t("HighestScore")}
              </div>
              <div className="text-lg font-bold">
                {`${
                  analytics.testCategoryAnalytics[categoryAnalyticIndex]
                    .testAnalytics.testTypeAnalytics[testTypeAnalyticIndex]
                    .highestScore
                }/9.0
                `}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-x-4">
            {analytics.testCategoryAnalytics[
              categoryAnalyticIndex
            ].testAnalytics.testTypeAnalytics[
              testTypeAnalyticIndex
            ].sectionsAnalytics.map((sa, i) => (
              <div
                key={sa.sectionName}
                className={cn(
                  "cursor-pointer rounded-xl border bg-muted px-4 py-1",
                  i === sectionIndex &&
                    "border-none bg-primary/10 font-medium text-primary"
                )}
                onClick={() => {
                  setSectionIndex(i)
                }}
              >
                {sa.sectionName}
              </div>
            ))}
          </div>

          <div className="mb-4 mt-6 grid w-full rounded-xl border bg-muted">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-nowrap text-black">
                      {t("TypeQuestion")}
                    </TableHead>
                    <TableHead className="text-nowrap text-center text-black">
                      {t("RightAnswer")}
                    </TableHead>
                    <TableHead className="text-nowrap text-center text-black">
                      {t("WrongAnswer")}
                    </TableHead>
                    <TableHead className="text-nowrap text-center text-black">
                      {t("Accurate2")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.testCategoryAnalytics[
                    categoryAnalyticIndex
                  ].testAnalytics.testTypeAnalytics[
                    testTypeAnalyticIndex
                  ].sectionsAnalytics[
                    sectionIndex
                  ].testSectionPartitionAnalytics.map((item) => (
                    <TableRow key={item.partitionTagDesc}>
                      <TableCell>
                        <div className="text-nowrap text-sm">
                          {item.partitionTagDesc}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-nowrap text-center">
                          {item.totalRight}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-nowrap text-center">
                          {item.totalWrong}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-nowrap text-center">
                          {(item.accuracyRate * 100).toFixed(1)}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <h2 className="mb-2 text-xl font-bold">{t("PracticeTestsList")}</h2>
            <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-nowrap">
                        {t("TakenDate")}
                      </TableHead>
                      <TableHead className="text-nowrap">
                        {t("Sections")}
                      </TableHead>
                      <TableHead className="text-nowrap text-center">
                        {t("Result")}
                      </TableHead>
                      <TableHead className="text-nowrap text-center">
                        {t("CompletionTime")}
                      </TableHead>
                      <TableHead className="text-nowrap text-right">
                        {t("Action")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.testHistories
                      .filter(
                        (th) =>
                          th.testType ===
                          analytics.testCategoryAnalytics[categoryAnalyticIndex]
                            .testAnalytics.testTypeAnalytics[
                            testTypeAnalyticIndex
                          ].testType
                      )
                      .map((test) => (
                        <TableRow key={test.testHistoryId}>
                          <TableCell>
                            <div className="text-nowrap font-medium">
                              {toDate(test.takenDate)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {test.isFull ? (
                                <div className="rounded-lg bg-success px-2 py-1 text-xs font-bold text-success-foreground">
                                  Full test
                                </div>
                              ) : (
                                Array.from(
                                  new Set(
                                    test.partitionHistories.map(
                                      (ph) => ph.testSectionName
                                    )
                                  )
                                ).map((section) => (
                                  <div
                                    key={section}
                                    className="rounded-lg bg-warning px-2 py-1 text-xs font-bold text-warning-foreground"
                                  >
                                    {section}
                                  </div>
                                ))
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-nowrap text-center">{`${test.totalRightAnswer}/${test.totalQuestion}`}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-nowrap text-center">
                              {convertSecondToText(test.totalCompletionTime)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link
                              href={`/tests/${test.test.id}/results/${test.testHistoryId}`}
                              className="cursor-pointer text-nowrap text-right text-primary hover:underline"
                            >
                              {t("ViewDetail")}
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AnalyticsPage
