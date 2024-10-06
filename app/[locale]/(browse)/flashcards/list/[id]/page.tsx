import React from "react"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import getFlashcardDetail from "@/queries/flashcard/get-flashcard-detail"

import { CardDescription, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

import AddToLearningListButton from "../../_components/add-to-learning-list-button"
import FlashcardDetail from "../../_components/flashcard-detail"
import FlashcardSlider from "../../_components/flashcard-slider"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardDetailPage({ params }: Props) {
  const flashcard = await getFlashcardDetail(+params.id)

  if (!flashcard) return notFound()

  if (flashcard.userFlashcards?.[0]) {
    redirect(`/flashcards/list/${flashcard.flashcardId}/privacy`)
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <CardTitle className="text-3xl">{flashcard.title}</CardTitle>
          <CardDescription className="mt-2">
            {flashcard.description}
          </CardDescription>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-3">
        <AddToLearningListButton
          flashcardId={flashcard.flashcardId}
          type="add-to-my-list"
        />
        <Link
          href={`/flashcards/list/${params.id}/fullscreen`}
          className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold active:border-b-2 sm:col-span-6 lg:col-span-3"
        >
          <Icons.Fullscreen className="size-8 text-primary" />
          FULLSCREEN
        </Link>
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Practice className="size-8 text-primary" />
          LUYỆN TẬP
        </div>
      </div>

      <FlashcardSlider
        noStar
        userFlashcardProgresses={flashcard.flashcardDetails}
      />

      <div className="mt-4 flex flex-col gap-y-6">
        {flashcard.flashcardDetails.map((fcd) => (
          <FlashcardDetail
            key={fcd.flashcardDetailId}
            definition={fcd.definition}
            example={fcd.example}
            imageUrl={fcd.cloudResource?.url || null}
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
