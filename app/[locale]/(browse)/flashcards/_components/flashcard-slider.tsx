"use client"

import { useState } from "react"
import { type FlashcardDetail as TFlashcardDetail } from "@/queries/flashcard/get-flashcard-practice"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { changeFlashcardStatus } from "@/actions/flashcard/detail/toggle-star"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import FlashcardDetail from "./flashcard-detail"
import TextToSpeak from "./text-to-speak"

type Props = {
  showTrackSwitch?: boolean
  fullScreen?: boolean
  noStar?: boolean
  userFlashcardProgresses: ({
    userFlashcardProgressId?: number
    progressStatus?: "NEW" | "STUDYING" | "PROFICIENT" | "STARRED"
    flashcardDetailId?: number
  } & TFlashcardDetail)[]
}

export default function FlashcardSlider({
  userFlashcardProgresses,
  showTrackSwitch = false,
  noStar = false,
  fullScreen = false,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showStudyingCard, setShowStudyingCard] = useState<
    "hide" | "rotate" | "slip"
  >("hide")
  const [starredFlashcards, setStarredFlashcards] = useState<number[]>(
    () =>
      userFlashcardProgresses
        .map((item) =>
          item.progressStatus === "STARRED"
            ? item.userFlashcardProgressId
            : false
        )
        .filter(Boolean) as number[]
  )
  const [showProficientCard, setShowProficientCard] = useState<
    "hide" | "rotate" | "slip"
  >("hide")
  const [trackMode, setTrackMode] = useState(false)
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(userFlashcardProgresses.length).fill(false)
  )
  const [pending, setPending] = useState(false)

  const handleNext = async () => {
    if (currentIndex < userFlashcardProgresses.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleProficient = async () => {
    setPending(true)
    changeFlashcardStatus(
      userFlashcardProgresses[currentIndex].flashcardId,
      userFlashcardProgresses[currentIndex].userFlashcardProgressId!,
      "STUDYING"
    )
    handleNext()
    setShowProficientCard("rotate")
    await new Promise((resolve) => setTimeout(resolve, 200))
    setShowProficientCard("slip")
    await new Promise((resolve) => setTimeout(resolve, 400))
    setShowProficientCard("hide")
    setPending(false)
  }

  const handleStarred = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    e.stopPropagation()

    const progressId =
      userFlashcardProgresses[currentIndex].userFlashcardProgressId!
    const isStarred = starredFlashcards.includes(progressId)

    if (isStarred) {
      setStarredFlashcards((prev) => prev.filter((f) => f !== progressId))
    } else {
      setStarredFlashcards((prev) => [...prev, progressId])
    }

    changeFlashcardStatus(
      userFlashcardProgresses[currentIndex].flashcardId,
      progressId,
      isStarred ? "STUDYING" : "STARRED"
    )
  }

  const handlePrev = async () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleStudying = async () => {
    setPending(true)
    handleNext()
    setShowStudyingCard("rotate")
    await new Promise((resolve) => setTimeout(resolve, 200))
    setShowStudyingCard("slip")
    await new Promise((resolve) => setTimeout(resolve, 400))
    setShowStudyingCard("hide")
    setPending(false)
  }

  const handleFlip = async () => {
    const newFlippedCards = [...flippedCards]
    newFlippedCards[currentIndex] = !newFlippedCards[currentIndex]
    setFlippedCards(newFlippedCards)
  }

  if (!userFlashcardProgresses[currentIndex]) return null

  return (
    <div
      className={cn("mb-4 mt-6 flex w-full flex-col", fullScreen && "h-full")}
    >
      {showTrackSwitch && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
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
      )}
      <div className="flex-1 cursor-pointer rounded-xl" onClick={handleFlip}>
        <div className="relative size-full transition-all duration-500">
          <div
            className={cn(
              "absolute flex size-full items-center justify-center rounded-xl border bg-gray-100 p-6 text-center shadow-lg transition-all duration-500",
              flippedCards[currentIndex] &&
                "opacity-0 [transform:rotateX(180deg)]"
            )}
          >
            <div className="absolute right-6 top-6 z-[5] flex w-full items-center justify-end gap-2">
              <TextToSpeak
                text={userFlashcardProgresses[currentIndex].wordText || ""}
                voiceType="UK"
              />
              <TextToSpeak
                text={userFlashcardProgresses[currentIndex].wordText || ""}
                voiceType="US"
              />
              {!trackMode && !noStar && (
                <Button onClick={handleStarred} variant="ghost" size="icon">
                  <Icons.Star
                    className={cn(
                      "size-7",
                      starredFlashcards.includes(
                        userFlashcardProgresses[currentIndex]
                          .userFlashcardProgressId!
                      )
                        ? "text-star"
                        : "text-neutral-300"
                    )}
                  />
                </Button>
              )}
            </div>
            <p
              className={cn("text-2xl font-semibold", fullScreen && "text-4xl")}
            >
              {userFlashcardProgresses[currentIndex].wordText}
            </p>
          </div>

          <div
            className={cn(
              "absolute z-10 flex size-full items-center justify-center rounded-xl border-2 border-yellow-500 bg-gray-100 p-6 text-center opacity-0 shadow-lg duration-500",
              showStudyingCard === "hide" && "hidden",
              showStudyingCard === "rotate" &&
                "opacity-100 [transform:rotateZ(1.5deg)]",
              showStudyingCard === "slip" &&
                "opacity-100 [transform:translateX(-15%)]"
            )}
          >
            <p
              className={cn(
                "text-3xl font-bold text-yellow-500",
                fullScreen && "text-5xl"
              )}
            >
              Chưa biết
            </p>
          </div>

          <div
            className={cn(
              "absolute z-10 flex size-full items-center justify-center rounded-xl border-2 border-primary bg-gray-100 p-6 text-center opacity-0 shadow-lg duration-500",
              showProficientCard === "hide" && "hidden",
              showProficientCard === "rotate" &&
                "opacity-100 [transform:rotateZ(-1.5deg)]",
              showProficientCard === "slip" &&
                "opacity-100 [transform:translateX(15%)]"
            )}
          >
            <p
              className={cn(
                "text-3xl font-bold text-success",
                fullScreen && "text-5xl"
              )}
            >
              Đã biết
            </p>
          </div>

          <FlashcardDetail
            className={cn(
              "w-full transition-all duration-500 [transform:rotateX(180deg)]",
              fullScreen && "h-full",
              !flippedCards[currentIndex]
                ? "opacity-0"
                : "[transform:rotateX(0deg)]"
            )}
            fullScreen={fullScreen}
            key={userFlashcardProgresses[currentIndex].flashcardDetailId}
            definition={userFlashcardProgresses[currentIndex].definition}
            example={userFlashcardProgresses[currentIndex].example}
            imageUrl={
              userFlashcardProgresses[currentIndex].cloudResource?.url || null
            }
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
          onClick={trackMode ? handleStudying : handlePrev}
          disabled={
            pending ||
            (!trackMode && currentIndex === 0) ||
            (trackMode && currentIndex === userFlashcardProgresses.length - 1)
          }
          variant="outline"
          className="flex items-center rounded-full"
        >
          {trackMode ? (
            <X className="size-7 text-danger" />
          ) : (
            <ChevronLeft className="size-7" />
          )}
        </Button>
        <div className="font-medium text-gray-500">
          {currentIndex + 1} / {userFlashcardProgresses.length}
        </div>
        <Button
          size="icon"
          onClick={trackMode ? handleProficient : handleNext}
          disabled={
            pending || currentIndex === userFlashcardProgresses.length - 1
          }
          variant="outline"
          className="flex items-center rounded-full"
        >
          {trackMode ? (
            <Check className="size-7 text-success" />
          ) : (
            <ChevronRight className="size-7" />
          )}
        </Button>
      </div>
    </div>
  )
}
