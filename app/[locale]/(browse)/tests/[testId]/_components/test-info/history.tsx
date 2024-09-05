import React from "react"
import Link from "next/link"
import { type TestHistory } from "@/queries/test/get-test"
import { enUS, vi } from "date-fns/locale"
import { getTranslations } from "next-intl/server"

import { convertSecondToText, toDateTime } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = { testHistories: TestHistory[]; testId: number; locale: string }

async function History({ testHistories, testId, locale }: Props) {
  const t = await getTranslations("TestDetailPage")

  if (testHistories.length <= 0) return null

  return (
    <div>
      <h4 className="font-bold">{t("History.YourTestResults")}</h4>

      <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-nowrap">
                  {t("History.TakenDate")}
                </TableHead>
                <TableHead className="text-nowrap">
                  {t("History.Sections")}
                </TableHead>
                <TableHead className="text-nowrap text-center">
                  {t("History.Result")}
                </TableHead>
                <TableHead className="text-nowrap text-center">
                  {t("History.CompletionTime")}
                </TableHead>
                <TableHead className="text-nowrap text-right">
                  {t("History.Action")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testHistories.map((test) => (
                <TableRow key={test.testHistoryId}>
                  <TableCell>
                    <div className="text-nowrap font-medium">
                      {toDateTime(test.takenDate, locale === "en" ? enUS : vi)}
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
                      href={`/tests/${testId}/results/${test.testHistoryId}`}
                      className="cursor-pointer text-nowrap text-right text-primary hover:underline"
                    >
                      {t("History.ViewDetail")}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default History
