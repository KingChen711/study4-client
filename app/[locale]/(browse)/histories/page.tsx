import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import getHistories from "@/queries/test/get-histories"
import { enUS, vi } from "date-fns/locale"
import { z } from "zod"

import { convertSecondToText, toDateTime } from "@/lib/utils"
import Paginator from "@/components/ui/paginator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  searchParams: {
    page?: string
  }
  params: {
    locale: string
  }
}

const historiesParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
})

async function HistoriesPage({ searchParams, params }: Props) {
  const { page } = historiesParamsSchema.parse(searchParams)
  const t = await getTranslations("HistoryPage")
  const { userTests, totalPage } = await getHistories({ page, pageSize: 4 })

  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">{t("Title")}</h2>

      <div className="flex flex-col gap-y-6">
        {userTests.map((test) => (
          <div key={test.id}>
            <h4 className="text-lg font-medium">{test.testTitle}</h4>

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
                    {test.testHistories.map((testHistory) => (
                      <TableRow key={testHistory.testHistoryId}>
                        <TableCell>
                          <div className="text-nowrap font-medium">
                            {toDateTime(
                              testHistory.takenDate,
                              params.locale === "en" ? enUS : vi
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {testHistory.isFull ? (
                              <div className="rounded-lg bg-success px-2 py-1 text-xs font-bold text-success-foreground">
                                Full test
                              </div>
                            ) : (
                              Array.from(
                                new Set(
                                  testHistory.partitionHistories.map(
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
                          <div className="text-nowrap text-center">{`${testHistory.totalRightAnswer}/${testHistory.totalQuestion}`}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-nowrap text-center">
                            {convertSecondToText(
                              testHistory.totalCompletionTime
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/tests/${test.testId}/results/${testHistory.testHistoryId}`}
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
        ))}
      </div>

      {userTests.length > 0 && (
        <Paginator
          metadata={{
            pageNumber: page,
            totalPages: totalPage,
          }}
        />
      )}
    </div>
  )
}

export default HistoriesPage
