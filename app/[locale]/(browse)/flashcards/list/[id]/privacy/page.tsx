import React from "react"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardDetailPrivacyPage({ params }: Props) {
  const flashcard = await getFlashcardDetailPrivacy(+params.id)

  if (!flashcard) return notFound()

  return (
    <div className="mx-auto max-w-3xl space-y-4 py-8">
      {/* <h1 className="text-3xl font-bold">Flashcards: {flashcard.title}</h1>

      <Button className="w-full py-6 text-lg font-semibold">
        Luyện tập flashcards
      </Button>

      <div className="flex items-center justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Shuffle className="size-4" />
          Xem ngẫu nhiên
        </Button>
        <Button variant="destructive" className="flex items-center gap-2">
          <X className="size-4" />
          Dừng học học phần này
        </Button>
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
      </div> */}
    </div>
  )
}

export default FlashcardDetailPrivacyPage
