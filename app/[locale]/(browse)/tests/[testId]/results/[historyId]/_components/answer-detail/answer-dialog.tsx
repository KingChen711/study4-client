"use client"

import React from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import useAnswerTranscript from "@/hooks/use-answer-transcript"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NoResult from "@/components/ui/no-result"
import ParseHtml from "@/components/ui/parse-html"
import Passage from "@/components/ui/passage"
import Recording from "@/components/ui/recording"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import TagBadges from "@/components/badges/tag-badge"

import QuestionContent from "./question-content"

type Props = {
  partitionId: number
  gradeId: number
  circleQuestion?: boolean
  gradeStatus?: "Correct" | "Wrong" | "Skip"
  questionNumber?: number
  transcript?: string
}

function AnswerDialog({
  gradeId,
  partitionId,
  gradeStatus,
  questionNumber,
  circleQuestion = false,
  transcript,
}: Props) {
  const { data: answerTranscript, isPending } = useAnswerTranscript({
    gradeId,
    partitionId,
  })

  const t = useTranslations("TestResultPage")

  return (
    <Dialog>
      <DialogTrigger asChild>
        {circleQuestion ? (
          <div
            className={cn(
              "flex size-7 cursor-pointer items-center justify-center rounded-full border text-xs text-black hover:text-white",
              gradeStatus === "Correct" &&
                "border-success bg-success-100 hover:bg-success",
              gradeStatus === "Wrong" &&
                "border-danger bg-danger-100 hover:bg-danger",
              gradeStatus === "Skip" && "border-skip bg-skip-100 hover:bg-skip"
            )}
          >
            {questionNumber}
          </div>
        ) : (
          <div className="cursor-pointer text-nowrap text-primary hover:underline">
            [{t("Detail")}]
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-screen-md overflow-y-hidden">
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
          {!isPending && !answerTranscript && (
            <NoResult title="Not found answer transcript" />
          )}
          {answerTranscript && (
            <>
              <DialogTitle>
                {t("AnswerDetail", {
                  questionNumber: answerTranscript.testGrades[0].questionNumber,
                })}
              </DialogTitle>
              <DialogDescription className="overflow-y-hidden">
                <TagBadges
                  tagName={
                    answerTranscript.testSectionPart.partitionTag
                      .partitionTagDesc
                  }
                />

                <div className="mt-4 flex max-h-[50dvh] flex-col gap-y-4 overflow-y-auto border-b">
                  <div>
                    <Recording
                      srcUrl={
                        answerTranscript?.testSectionPart?.testSection
                          ?.cloudResource?.url || null
                      }
                    />
                  </div>
                  {transcript && (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="w-fit">
                          {t("ShowTranscript")}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="rounded-md bg-neutral-100 p-3">
                            <ParseHtml data={transcript} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                  <Passage
                    readingDesc={
                      answerTranscript.testSectionPart.testSection.readingDesc
                    }
                  />
                  <div className="rounded-md bg-neutral-100 p-3">
                    <ParseHtml
                      data={answerTranscript.testSectionPart.partitionDesc}
                    />
                  </div>
                </div>
                <Separator className="my-2" />
                <div className="max-h-[35dvh] overflow-y-auto">
                  <QuestionContent answerTranscript={answerTranscript} />
                </div>
                {answerTranscript.testGrades[0].question
                  .questionAnswerExplanation && (
                  <div className="mt-4 flex flex-col gap-y-4">
                    <div className="font-bold">Giải thích chi tiết</div>
                    <ParseHtml data={"Hello đáp án nè"} />
                  </div>
                )}
              </DialogDescription>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AnswerDialog
