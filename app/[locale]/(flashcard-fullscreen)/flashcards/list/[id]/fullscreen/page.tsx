import React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import getFlashcardDetail from "@/queries/flashcard/get-flashcard-detail"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import FlashcardSlider from "@/app/[locale]/(browse)/flashcards/_components/flashcard-slider"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardFullscreenPage({ params }: Props) {
  const flashcard = await getFlashcardDetail(+params.id)

  if (!flashcard) return notFound()

  if (flashcard.userFlashcards?.[0]) {
    redirect(`/flashcards/list/${flashcard.flashcardId}/privacy/fullscreen`)
  }

  return (
    <main className="flex h-screen flex-col p-6">
      <div className="flex shrink-0 items-center justify-between">
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
      <div className="mx-auto flex size-full max-w-5xl flex-1 flex-col items-center justify-center">
        <FlashcardSlider
          fullScreen
          noStar
          userFlashcardProgresses={flashcard.flashcardDetails}
        />
      </div>
    </main>
  )
}

export default FlashcardFullscreenPage
