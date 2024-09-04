import React from "react"
import Link from "next/link"
import { type TestHistory } from "@/queries/test/get-test"
import { enUS, vi } from "date-fns/locale"

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

//TODO:i18n
async function History({ testHistories, testId, locale }: Props) {
  if (testHistories.length <= 0) return null

  return (
    <div>
      <h4 className="font-bold">Kết quả làm bài của bạn:</h4>

      <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-nowrap">Ngày làm</TableHead>
                <TableHead className="text-nowrap">Phần thi</TableHead>
                <TableHead className="text-nowrap">Kết quả</TableHead>
                <TableHead className="text-nowrap">Thời gian làm bài</TableHead>
                <TableHead className="text-nowrap text-right">
                  Hành động
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
                        <div className="rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
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
                            className="rounded-lg bg-yellow-500 px-2 py-1 text-xs font-bold text-primary-foreground"
                          >
                            {section}
                          </div>
                        ))
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-nowrap">{`${test.totalRightAnswer}/${test.totalQuestion}`}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-nowrap">
                      {convertSecondToText(test.totalCompletionTime)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/tests/${testId}/results/${test.testHistoryId}`}
                      className="cursor-pointer text-nowrap text-right text-primary hover:underline"
                    >
                      Xem chi tiết
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
