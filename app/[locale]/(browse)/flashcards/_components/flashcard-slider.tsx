"use client"

import { useState } from "react"
import { type UserFlashcardProgress } from "@/queries/flashcard/get-flashcard-practice"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import FlashcardDetail from "./flashcard-detail"

type Props = {
  userFlashcardProgresses: UserFlashcardProgress[]
}

export default function FlashcardSlider({ userFlashcardProgresses }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [trackMode, setTrackMode] = useState(false)
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(userFlashcardProgresses.length).fill(false)
  )

  const handleNext = () => {
    if (currentIndex < userFlashcardProgresses.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleFlip = () => {
    const newFlippedCards = [...flippedCards]
    newFlippedCards[currentIndex] = !newFlippedCards[currentIndex]
    setFlippedCards(newFlippedCards)
  }

  return (
    <div className="mb-4 mt-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={trackMode}
            onCheckedChange={setTrackMode}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode" className="text-base">
            Theo dõi tiến độ
          </Label>
        </div>
      </div>
      <div className="mt-4 cursor-pointer rounded-xl" onClick={handleFlip}>
        <div
          className={`relative size-full transition-all duration-500 ${
            flippedCards[currentIndex] ? "[transform:rotateX(180deg)]" : ""
          }`}
        >
          <div
            className={cn(
              "absolute flex size-full items-center justify-center rounded-xl border bg-gray-100 p-6 text-center shadow-lg",
              flippedCards[currentIndex] && "opacity-0"
            )}
          >
            <p className="text-2xl font-semibold">
              {userFlashcardProgresses[currentIndex].wordText}
            </p>
          </div>

          <FlashcardDetail
            className={cn(
              "w-full [transform:rotateX(180deg)]",
              !flippedCards[currentIndex] && "opacity-0"
            )}
            key={userFlashcardProgresses[currentIndex].flashcardDetailId}
            definition={userFlashcardProgresses[currentIndex].definition}
            example={userFlashcardProgresses[currentIndex].example}
            imageUrl={userFlashcardProgresses[currentIndex].cloudResource.url}
            wordForm={userFlashcardProgresses[currentIndex].wordForm}
            wordPronunciation={
              userFlashcardProgresses[currentIndex].wordPronunciation
            }
            wordText={userFlashcardProgresses[currentIndex].wordText}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-4">
        <Button
          size="icon"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex items-center rounded-full"
        >
          <ChevronLeft className="size-7" />
        </Button>
        <div className="font-medium text-gray-500">
          {currentIndex + 1} / {userFlashcardProgresses.length}
        </div>
        <Button
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === userFlashcardProgresses.length - 1}
          variant="outline"
          className="flex items-center rounded-full"
        >
          <ChevronRight className="size-7" />
        </Button>
      </div>
    </div>
  )
}
