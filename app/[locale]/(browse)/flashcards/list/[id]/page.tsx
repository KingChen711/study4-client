import React from "react"
import { notFound } from "next/navigation"
import getFlashcardDetail from "@/queries/flashcard/get-flashcard-detail"
import { Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"

import AddToLearningListButton from "../../_components/add-to-learning-list-button"
import FlashcardDetail from "../../_components/flashcard-detail"
import RemoveFromLearningListButton from "../../_components/remove-from-learning-list-button"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardDetailPage({ params }: Props) {
  const flashcard = await getFlashcardDetail(+params.id)

  if (!flashcard) return notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-4 py-8">
      <h1 className="text-3xl font-bold">Flashcards: {flashcard.title}</h1>

      <Button className="w-full py-6 text-lg font-semibold">
        Luyện tập flashcards
      </Button>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Shuffle className="size-4" />
          Xem ngẫu nhiên
        </Button>

        {flashcard.userFlashcards?.[0] ? (
          <RemoveFromLearningListButton flashcardId={flashcard.flashcardId} />
        ) : (
          <AddToLearningListButton
            showPlus
            flashcardId={flashcard.flashcardId}
          />
        )}
      </div>

      <p className="text-sm text-gray-500">List có {flashcard.totalWords} từ</p>

      <div className="flex flex-col gap-y-6">
        {flashcard.flashcardDetails.map((fcd) => (
          <FlashcardDetail
            key={fcd.flashcardDetailId}
            definition={fcd.definition}
            example={fcd.example}
            imageUrl={fcd.cloudResource.url}
            wordForm={fcd.wordForm}
            wordPronunciation={fcd.wordPronunciation}
            wordText={fcd.wordText}
          />
        ))}
      </div>
    </div>
  )
}

export default FlashcardDetailPage
