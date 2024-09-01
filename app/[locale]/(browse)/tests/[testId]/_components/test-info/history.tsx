import React from "react"
import { type TestHistory } from "@/queries/test/get-test"

import { convertSecondToText } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = { testHistories: TestHistory[] }

async function History({ testHistories }: Props) {
  console.log(testHistories[0])

  return (
    <div>
      <h4 className="font-bold">Kết quả làm bài của bạn:</h4>

      <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày làm</TableHead>
                <TableHead>Phần thi</TableHead>
                <TableHead>Kết quả</TableHead>
                <TableHead>Thời gian làm bài</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testHistories.map((test) => (
                <TableRow key={test.testHistoryId}>
                  <TableCell>
                    <div className="text-nowrap font-medium">
                      {new Date(test.takenDate).toDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">{/* {test.} */}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-nowrap">{`${test.totalRightAnswer}/${test.totalQuestion}`}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-nowrap">
                      {convertSecondToText(test.totalCompletionTime)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="cursor-pointer text-nowrap text-right text-primary hover:underline">
                      Xem chi tiết
                    </div>
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
