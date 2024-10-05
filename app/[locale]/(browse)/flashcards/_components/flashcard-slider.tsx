"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

interface Flashcard {
  question: string
  answer: string
}

const flashcards: Flashcard[] = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
  { question: "What is the chemical symbol for gold?", answer: "Au" },
  { question: "What year did World War II end?", answer: "1945" },
]

export default function FlashcardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(flashcards.length).fill(false)
  )

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
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

  const progress = ((currentIndex + 1) / flashcards.length) * 100

  return (
    <div className="mb-4 mt-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode" className="text-base">
            Theo dõi tiến độ
          </Label>
        </div>
        <div className="mb-4 flex flex-1 items-center justify-end gap-x-2">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <Progress value={progress} className="h-3 w-1/2" />
        </div>
      </div>
      <div
        className="h-64 cursor-pointer rounded-xl bg-white shadow-lg"
        onClick={handleFlip}
      >
        <div
          className={`relative size-full transition-all duration-500 ${
            flippedCards[currentIndex] ? "[transform:rotateX(180deg)]" : ""
          }`}
        >
          <div className="absolute flex size-full items-center justify-center p-6 text-center">
            <p className="text-xl font-semibold">
              {flashcards[currentIndex].question}
            </p>
          </div>
          <div className="absolute flex size-full items-center justify-center rounded-xl bg-blue-50 p-6 text-center [transform:rotateX(180deg)]">
            <p className="text-xl font-semibold">
              {flashcards[currentIndex].answer}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center gap-x-4">
        <Button
          size="icon"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex items-center rounded-full"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <Button
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="flex items-center rounded-full"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
