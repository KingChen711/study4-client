import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import getFlashcardExamResult from "@/queries/flashcard/get-flashcard-exam-result"
import { Check, X } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { Progress } from "@/components/ui/progress"

type Props = {
  params: {
    id: string
  }
  searchParams: {
    takenDateTime?: string
  }
}

const flashcardExamResult = z.object({
  takenDateTime: z.coerce.date(),
})

async function FlashcardExamResultPage({ params, searchParams }: Props) {
  const { takenDateTime } = flashcardExamResult.parse(searchParams)
  const result = await getFlashcardExamResult(
    +params.id,
    takenDateTime.toISOString()
  )

  if (!result) return notFound()

  const flashcard = await getFlashcardDetailPrivacy(+params.id)

  if (!flashcard) return notFound()

  return (
    <main className="flex flex-col">
      <div className="fixed flex w-screen shrink-0 items-center justify-between bg-background p-6 shadow">
        <div className="flex-1" />
        <div className="text-lg font-bold">{flashcard.title}</div>
        <div className="flex flex-1 justify-end">
          <Button asChild size="icon" variant="outline">
            <Link href={`/flashcards/list/${flashcard.flashcardId}`}>
              <X className="size-7" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-6">
            <h1 className="text-center text-3xl font-bold">
              Hãy đối tốt với bản thân, và tiếp tục ôn luyện!
            </h1>
            <div className="flex items-center justify-between">
              <div>
                Thời gian của bạn:{" "}
                {Math.max(Math.round(result.totalCompletionTime / 60), 1)} phút
              </div>
            </div>
            <div className="flex gap-12">
              <div className="flex-1">
                <div className="relative mx-auto size-40">
                  <Progress
                    value={
                      (result.totalRightAnswer / result.totalQuestion) * 100
                    }
                    className="size-40 -rotate-90"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">
                      {Math.round(
                        (result.totalRightAnswer / result.totalQuestion) * 100
                      )}
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-lg">
                  <div>
                    Đúng{" "}
                    <span className="font-bold text-[#4ade80]">
                      {result.totalRightAnswer}
                    </span>
                  </div>
                  <div>
                    Sai{" "}
                    <span className="font-bold text-[#f87171]">
                      {result.totalWrongAnswer}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-wrap gap-4">
                {result.flashcardExamGrades.map((feg) => (
                  <Dialog key={feg.flashcardExamGradeId}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        {feg.questionNumber}
                        {feg.flashcardGradeStatus === "Correct" ? (
                          <Check className="size-6 text-success" />
                        ) : (
                          <X className="size-6 text-danger" />
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="pr-2">
                          Question type: {feg.questionType}
                        </DialogTitle>
                        <DialogDescription className="flex flex-col">
                          {feg.questionType !== "True/False" ? (
                            <>
                              <div className="my-3 text-base font-medium text-foreground">
                                {feg.questionTitle}
                              </div>

                              <div className="flex items-center gap-x-1">
                                <div>Your answer:</div>
                                <div>{feg.userAnswer}</div>
                                {feg.flashcardGradeStatus === "Correct" ? (
                                  <Icons.Check className="size-5 text-success" />
                                ) : (
                                  <X className="size-5 text-danger" />
                                )}
                              </div>
                              <div className="flex items-center gap-x-1">
                                <div>Correct answer:</div>
                                <div>{feg.correctAnswer}</div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="my-3 flex items-center">
                                <div className="flex-1 text-base text-foreground">
                                  {feg.questionTitle}
                                </div>
                                <div className="mx-2 h-full w-[2px] bg-neutral-200" />
                                <div className="flex-1 text-base text-foreground">
                                  {feg.questionDesc}
                                </div>
                              </div>
                              <div className="flex items-center gap-x-1">
                                <div>Your answer:</div>
                                <div>
                                  {feg.userAnswer === feg.questionDesc
                                    ? "True"
                                    : "False"}
                                </div>
                                {feg.flashcardGradeStatus === "Correct" ? (
                                  <Icons.Check className="size-5 text-success" />
                                ) : (
                                  <X className="size-5 text-danger" />
                                )}
                              </div>
                              <div className="flex items-center gap-x-1">
                                <div>Correct answer:</div>
                                <div>
                                  {feg.questionDesc === feg.correctAnswer
                                    ? "True"
                                    : "False"}
                                </div>
                              </div>
                            </>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FlashcardExamResultPage
