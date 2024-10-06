import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

import ExamSection from "./_components/exam-section"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardExamPage({ params }: Props) {
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
      <div className="mx-auto flex size-full max-w-3xl flex-1 flex-col items-center justify-center pt-[92px]">
        <ExamSection
          totalQuestion={
            flashcard.newFlashCardDetails.length +
            flashcard.proficientFlashCardDetails.length +
            flashcard.studyingFlashCardDetails.length +
            flashcard.starredFlashCardDetails.length
          }
          flashcardId={flashcard.flashcardId}
          title={flashcard.title}
        />
      </div>
    </main>
  )
}

export default FlashcardExamPage
