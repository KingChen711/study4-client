import React from "react"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import { Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

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

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <CardTitle className="text-3xl">{flashcard.title}</CardTitle>
          <CardDescription className="mt-2">
            {flashcard.description}
          </CardDescription>
        </div>
        <div className="flex gap-x-2">
          <Button variant="outline" size="icon">
            <Edit className="size-4" />
            <span className="sr-only">Edit topic</span>
          </Button>
          <RemoveFromLearningListButton
            redirectToPublic
            flashcardId={flashcard.flashcardId}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-3">
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Fullscreen className="size-8 text-primary" />
          FULLSCREEN
        </div>
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Word className="size-8 text-primary" />
          TỪ MỚI
        </div>
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Practice className="size-8 text-primary" />
          LUYỆN TẬP
        </div>
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.History className="size-8 text-primary" />
          LỊCH SỬ
        </div>
      </div>

      <h3 className="mb-2 mt-4 text-lg font-bold">
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
      <h3 className="mb-2 mt-4 text-lg font-bold">
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
