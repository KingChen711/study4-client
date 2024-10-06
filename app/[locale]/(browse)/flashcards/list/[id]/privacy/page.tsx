import React from "react"
import { notFound } from "next/navigation"
import getFlashcardDetailPrivacy from "@/queries/flashcard/get-flashcard-detail-privacy"
import getFlashcardPractice from "@/queries/flashcard/get-flashcard-practice"

import { CardDescription, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

import AddNewWordDialog from "../../../_components/add-new-word-dialog"
import FlashcardDetail from "../../../_components/flashcard-detail"
import FlashcardSlider from "../../../_components/flashcard-slider"
import RemoveFromLearningListButton from "../../../_components/remove-from-learning-list-button"
import UpdateFlashcardDialog from "../../../_components/update-flashcard-dialog"

type Props = {
  params: {
    id: string
  }
}

async function FlashcardDetailPrivacyPage({ params }: Props) {
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
    <div className="mx-auto max-w-3xl py-8">
      <div className="flex items-center justify-between gap-x-4">
        <div>
          <CardTitle className="text-3xl">{flashcard.title}</CardTitle>
          <CardDescription className="mt-2">
            {flashcard.description}
          </CardDescription>
        </div>
        <div className="flex gap-x-2">
          {!flashcard.isPublic && (
            <UpdateFlashcardDialog
              description={flashcard.description}
              title={flashcard.title}
              flashcardId={flashcard.flashcardId}
            />
          )}

          <RemoveFromLearningListButton
            redirectToPublic={flashcard.isPublic}
            flashcardId={flashcard.flashcardId}
          />
        </div>
      </div>

      <div className="my-4 grid grid-cols-12 gap-3">
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Fullscreen className="size-8 text-primary" />
          FULLSCREEN
        </div>
        {!flashcard.isPublic && (
          <AddNewWordDialog flashcardId={flashcard.flashcardId} />
        )}
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.Practice className="size-8 text-primary" />
          LUYỆN TẬP
        </div>
        <div className="col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold active:border-b-2 sm:col-span-6 lg:col-span-3">
          <Icons.History className="size-8 text-primary" />
          LỊCH SỬ
        </div>
      </div>

      <FlashcardSlider
        showTrackSwitch
        userFlashcardProgresses={flashcardPractice.userFlashcardProgresses.map(
          (item) => ({
            ...item.flashcardDetail,
            progressStatus: item.progressStatus,
            userFlashcardProgressId: item.userFlashcardProgressId,
          })
        )}
      />

      <h3 className="mb-2 mt-4 text-lg font-bold text-info">
        Đang học ({flashcard.studyingFlashCardDetails.length})
      </h3>
      {flashcard.studyingFlashCardDetails.length === 0 && (
        <div>Không tìm thấy flashcards nào.</div>
      )}
      <div className="flex flex-col gap-y-6">
        {flashcard.studyingFlashCardDetails.map((fcd) => (
          <FlashcardDetail
            showMutation={!flashcard.isPublic}
            flashcardId={flashcard.flashcardId}
            flashcardDetailId={fcd.flashcardDetailId}
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
      {flashcard.proficientFlashCardDetails.length > 0 && (
        <>
          <h3 className="mb-2 mt-4 text-lg font-bold text-primary">
            Thành thạo ({flashcard.proficientFlashCardDetails.length})
          </h3>
          <div className="flex flex-col gap-y-6">
            {flashcard.proficientFlashCardDetails.map((fcd) => (
              <FlashcardDetail
                showMutation={!flashcard.isPublic}
                flashcardId={flashcard.flashcardId}
                flashcardDetailId={fcd.flashcardDetailId}
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
        </>
      )}
      <h3 className="mb-2 mt-4 text-lg font-bold text-danger">
        Chưa học ({flashcard.newFlashCardDetails.length})
      </h3>
      {flashcard.newFlashCardDetails.length === 0 && (
        <div>Không tìm thấy flashcards nào.</div>
      )}
      <div className="flex flex-col gap-y-6">
        {flashcard.newFlashCardDetails.map((fcd) => (
          <FlashcardDetail
            showMutation={!flashcard.isPublic}
            flashcardId={flashcard.flashcardId}
            flashcardDetailId={fcd.flashcardDetailId}
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

      <h3 className="mb-2 mt-4 flex items-center gap-x-1 text-lg font-bold text-yellow-500">
        Đánh dấu <Icons.Star className="size-5 text-star" /> (
        {flashcard.starredFlashCardDetails.length})
      </h3>
      {flashcard.starredFlashCardDetails.length === 0 && (
        <div>Không tìm thấy flashcards nào.</div>
      )}
      <div className="flex flex-col gap-y-6">
        {flashcard.starredFlashCardDetails.map((fcd) => (
          <FlashcardDetail
            showMutation={!flashcard.isPublic}
            flashcardId={flashcard.flashcardId}
            flashcardDetailId={fcd.flashcardDetailId}
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

export default FlashcardDetailPrivacyPage
