import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import getFlashcardPractice from "@/queries/flashcard/get-flashcard-practice"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import FlashcardSlider from "@/app/[locale]/(browse)/flashcards/_components/flashcard-slider"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardPrivacyFullscreenPage({ params }: Props) {
  const flashcardData = getFlashcardDetailPrivacy(+params.id)
  const flashcardPracticeData = getFlashcardPractice(+params.id)

  const [flashcard, flashcardPractice] = await Promise.all([
    flashcardData,
    flashcardPracticeData,
  ])

  if (!flashcard || !flashcardPractice) {
    notFound()
  }

  return (
    <main className="flex h-screen flex-col p-6">
      <div className="flex shrink-0 items-center justify-between">
        <div className="flex-1" />
        <div className="text-lg font-bold">{flashcard.title}</div>
        <div className="flex flex-1 justify-end">
          <Button asChild size="icon" variant="outline">
            <Link href={`/flashcards/list/${flashcard.flashcardId}/privacy`}>
              <X className="size-7" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto flex size-full max-w-5xl flex-1 flex-col items-center justify-center">
        <FlashcardSlider
          fullScreen
          showTrackSwitch
          userFlashcardProgresses={flashcardPractice.userFlashcardProgresses.map(
            (item) => ({
              ...item.flashcardDetail,
              progressStatus: item.progressStatus,
              userFlashcardProgressId: item.userFlashcardProgressId,
            })
          )}
        />
      </div>
    </main>
  )
}

export default FlashcardPrivacyFullscreenPage
