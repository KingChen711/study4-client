import React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import DeleteWordButton from "./delete-word-button"
import EditWordDialog from "./edit-word-dialog"
import TextToSpeak from "./text-to-speak"

type Props = {
  wordText: string
  definition: string
  wordForm: string
  wordPronunciation: string | null
  example: string | null
  imageUrl: string | null
  showMutation?: boolean
  className?: string
  flashcardId?: number
  flashcardDetailId?: number
}

function FlashcardDetail({
  wordText,
  definition,
  wordPronunciation,
  example,
  imageUrl,
  wordForm,
  showMutation = false,
  className,
  flashcardDetailId,
  flashcardId,
}: Props) {
  return (
    <Card className={cn("min-h-80 bg-gray-100 shadow-lg", className)}>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div>
            <span className="text-2xl font-bold">{wordText}</span>
            <span className="ml-2 text-lg text-gray-500">
              {wordPronunciation}
            </span>
            {wordForm && (
              <span className="ml-2 text-lg text-gray-500">({wordForm})</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <TextToSpeak text={wordText || ""} voiceType="UK" />
            <TextToSpeak text={wordText || ""} voiceType="US" />

            {showMutation && flashcardDetailId && flashcardId && (
              <>
                <EditWordDialog
                  flashcardId={flashcardId}
                  flashcardDetailId={flashcardDetailId}
                  definition={definition}
                  wordText={wordText}
                  example={example || undefined}
                  imageUri={imageUrl || undefined}
                  wordPronunciation={wordPronunciation || undefined}
                  wordForm={wordForm}
                />
                <DeleteWordButton
                  flashcardId={flashcardId}
                  flashcardDetailId={flashcardDetailId}
                />
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 max-sm:items-center sm:flex-row">
          <div className="flex flex-1 flex-col gap-y-4">
            <div>
              {definition && (
                <>
                  <h3 className="font-semibold">Định nghĩa:</h3>
                  <p>{definition}</p>
                </>
              )}
            </div>
            <div>
              {example && (
                <>
                  <h3 className="font-semibold">Ví dụ:</h3>
                  <p>{example}</p>
                </>
              )}
            </div>
          </div>
          {imageUrl && (
            <Image alt="defi" src={imageUrl} width={240} height={240} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default FlashcardDetail

export function FlashcardDetailSkeleton() {
  return <Skeleton className="h-[350px] w-full" />
}
