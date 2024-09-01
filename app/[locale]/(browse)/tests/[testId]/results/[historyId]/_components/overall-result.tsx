import React from "react"
import { type TestHistory } from "@/queries/test/get-history"

import { convertSecondToText } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  testHistory: TestHistory
}

function OverallResult({ testHistory }: Props) {
  return (
    <div className="flex flex-col gap-y-2 rounded-lg border p-4">
      <h2 className="line-clamp-2 text-3xl font-bold">
        Kết quả thi: IELTS Simulation Listening test 1
      </h2>
      <div className="flex justify-between">
        <h3 className="mt-2 text-xl font-bold">Tổng quan:</h3>
        {/* TODO:link to test */}
        <Button variant="outline" size="sm">
          Quay về đề thi
        </Button>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-4 flex flex-col justify-center gap-y-2 rounded-xl border bg-muted p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <Icons.Check className="size-4" />
            <div>Kết quả bài làm:</div>
            <div>
              {`${testHistory.totalRightAnswer}/${testHistory.totalQuestion}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Target2 className="size-4 text-foreground" />
            <div>Độ chính xác:</div>
            <div>{(testHistory.accuracyRate * 100).toFixed(1)}%</div>
          </div>
          <div className="flex items-center gap-2">
            <Icons.Time className="size-4" />
            <div>Thời gian hoàn thành</div>
            <div>{convertSecondToText(testHistory.totalCompletionTime)}</div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Correct className="size-6 text-primary" />
          <div className="mt-1 font-bold text-primary">Trả lời đúng</div>
          <div className="text-lg font-bold">
            {testHistory.totalRightAnswer}
          </div>
          <div>câu hỏi</div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Wrong className="size-6 text-red-500" />
          <div className="mt-1 font-bold text-red-500">Trả lời sai</div>
          <div className="text-lg font-bold">
            {testHistory.totalWrongAnswer}
          </div>
          <div>câu hỏi</div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Skip className="size-6 text-neutral-600" />
          <div className="mt-1 font-bold text-neutral-600">Bỏ qua</div>
          <div className="text-lg font-bold">{testHistory.totalSkipAnswer}</div>
          <div>câu hỏi</div>
        </div>
      </div>
    </div>
  )
}

export default OverallResult

export function OverallResultSkeleton() {
  return <div>OverallResultSkeleton</div>
}
