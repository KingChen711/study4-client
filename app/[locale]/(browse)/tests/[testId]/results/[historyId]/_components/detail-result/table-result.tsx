import React from "react"
import {
  type PartitionHistory,
  type SectionHistory,
} from "@/queries/test/get-history"

import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  section: SectionHistory
}

function TableResult({ section }: Props) {
  return (
    <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-nowrap text-black">
                Phân loại câu hỏi
              </TableHead>
              <TableHead className="text-nowrap text-center text-black">
                Số câu đúng
              </TableHead>
              <TableHead className="text-nowrap text-center text-black">
                Số câu sai
              </TableHead>
              <TableHead className="text-nowrap text-center text-black">
                Số câu bỏ qua
              </TableHead>
              <TableHead className="text-nowrap text-center text-black">
                Độ chính xác
              </TableHead>
              <TableHead className="text-nowrap text-black">
                Danh sách câu hỏi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {section.partitionHistories?.map((partition) => (
              <TableRow key={partition.testSectionPartId}>
                <TableCell>
                  <div className="text-nowrap text-sm">
                    {partition.testSectionPart.partitionTag.partitionTagDesc}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-nowrap text-center">
                    {partition.totalRightAnswer}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-nowrap text-center">
                    {partition.totalWrongAnswer}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-nowrap text-center">
                    {partition.totalSkipAnswer}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-nowrap text-center">
                    {(partition.accuracyRate * 100).toFixed(1)}%
                  </div>
                </TableCell>
                <TableCell className="w-52">
                  <div className="flex flex-wrap gap-2">
                    {partition.testGrades.map((grade) => (
                      <div
                        key={grade.questionId}
                        className={cn(
                          "flex size-7 items-center justify-center rounded-full border text-xs text-black hover:text-white",
                          grade.inputedAnswer === grade.rightAnswer &&
                            "border-primary bg-primary/10 hover:bg-primary",
                          grade.inputedAnswer !== grade.rightAnswer &&
                            "border-red-500 bg-red-100 hover:bg-red-500",
                          !grade.inputedAnswer &&
                            "border-neutral-600 bg-neutral-300 hover:bg-neutral-600"
                        )}
                      >
                        {grade.questionNumber}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <div className="text-nowrap font-medium">Total</div>
              </TableCell>
              <TableCell>
                <div className="text-nowrap text-center">
                  {section.totalRightAnswer}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-nowrap text-center">
                  {section.totalWrongAnswer}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-nowrap text-center">
                  {section.totalSkipAnswer}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-nowrap text-center">
                  {(section.accuracyRate * 100).toFixed(1)}%
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TableResult
