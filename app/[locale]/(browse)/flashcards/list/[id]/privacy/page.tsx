import React from "react"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import { Shuffle } from "lucide-react"

import { Button } from "@/components/ui/button"

import FlashcardDetail from "../../../_components/flashcard-detail"
import RemoveFromLearningListButton from "../../../_components/remove-from-learning-list-button"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardDetailPrivacyPage({ params }: Props) {
  const flashcard = await getFlashcardDetailPrivacy(+params.id)

  if (!flashcard) return notFound()

  console.log({ flashcard })

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
        <RemoveFromLearningListButton
          flashcardId={flashcard.flashcardId}
          redirectToPublic
        />
      </div>

      <p className="text-sm text-gray-500">List có {flashcard.totalWords} từ</p>
      <h3 className="text-lg font-bold">
        Đang học ({flashcard.studyingFlashCardDetails.length})
      </h3>
      <div className="flex flex-col gap-y-6">
        {flashcard.studyingFlashCardDetails.map((fcd) => (
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
      <h3 className="text-lg font-bold">
        Chưa học ({flashcard.newFlashCardDetails.length})
      </h3>
      <div className="flex flex-col gap-y-6">
        {flashcard.newFlashCardDetails.map((fcd) => (
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

export default FlashcardDetailPrivacyPage
