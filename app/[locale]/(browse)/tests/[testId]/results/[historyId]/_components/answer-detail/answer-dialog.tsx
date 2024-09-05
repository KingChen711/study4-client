"use client"

import React from "react"

import { cn } from "@/lib/utils"
import useAnswerTranscript from "@/hooks/use-answer-transcript"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import TagBadges from "@/components/badges/tag-badge"

type Props = {
  partitionId: number
  gradeId: number
  circleQuestion?: boolean
  gradeStatus?: "Correct" | "Wrong" | "Skip"
  questionNumber?: number
}

function AnswerDialog({
  gradeId,
  partitionId,
  gradeStatus,
  questionNumber,
  circleQuestion = false,
}: Props) {
  const { data: answerTranscript, isPending } = useAnswerTranscript({
    gradeId,
    partitionId,
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {circleQuestion ? (
          <div
            className={cn(
              "flex size-7 cursor-pointer items-center justify-center rounded-full border text-xs text-black hover:text-white",
              gradeStatus === "Correct" &&
                "border-primary bg-primary/10 hover:bg-primary",
              gradeStatus === "Wrong" &&
                "border-red-500 bg-red-100 hover:bg-red-500",
              gradeStatus === "Skip" &&
                "border-neutral-600 bg-neutral-300 hover:bg-neutral-600"
            )}
          >
            {questionNumber}
          </div>
        ) : (
          <div className="cursor-pointer text-nowrap text-primary hover:underline">
            [Chi tiết]
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[80%] w-full max-w-screen-md overflow-y-hidden">
        <DialogHeader>
          {isPending && (
            <div className="flex aspect-[9/14] w-full flex-col">
              <Skeleton className="h-8 w-[95%]" />
              <div className="flex flex-1 flex-col gap-y-4">
                <Skeleton className="w-full basis-3/4" />
                <Skeleton className="w-full basis-1/4" />
              </div>
            </div>
          )}
          {/* TODO:Not found */}
          {!isPending && !answerTranscript && <div>Not Found</div>}
          {answerTranscript && (
            <>
              <DialogTitle>
                Đáp án chi tiết #{answerTranscript.testGrade.questionNumber}
              </DialogTitle>
              <DialogDescription className="overflow-y-hidden">
                <TagBadges
                  tagName={
                    answerTranscript.testSectionPart.partitionTag
                      .partitionTagDesc
                  }
                />

                <div className="max-h-[50dvh] overflow-y-auto border-b">
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>
                  <div className="mb-2 h-96 w-full bg-red-500"></div>a
                </div>
                <Separator className="my-2" />
                <div className="max-h-[30dvh] overflow-y-auto">
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>
                  <div className="mb-2 h-96 w-full bg-green-500"></div>b
                </div>
              </DialogDescription>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AnswerDialog
