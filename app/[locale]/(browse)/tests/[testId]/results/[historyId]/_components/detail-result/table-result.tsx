import React from "react"
import { type SectionHistory } from "@/queries/test/get-history"
import { useTranslations } from "next-intl"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import AnswerDialog from "../answer-detail/answer-dialog"

type Props = {
  section: SectionHistory
}

function TableResult({ section }: Props) {
  const t = useTranslations("TestResultPage")

  return (
    <div className="mb-4 mt-1 grid w-full rounded-xl border bg-muted">
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
                {t("SkipAnswer")}
              </TableHead>
              <TableHead className="text-nowrap text-center text-black">
                {t("Accurate2")}
              </TableHead>
              <TableHead className="text-nowrap text-black">
                {t("Questions")}
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
                <TableCell className="w-52 min-w-52">
                  <div className="flex flex-wrap gap-2">
                    {partition.testGrades.map((grade) => (
                      <AnswerDialog
                        key={grade.questionId}
                        gradeId={grade.testGradeId}
                        partitionId={partition.partitionHistoryId}
                        circleQuestion
                        gradeStatus={grade.gradeStatus}
                        questionNumber={grade.questionNumber}
                      />
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
