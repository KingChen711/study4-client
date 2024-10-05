import React from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { FlashcardDetailSkeleton } from "../../_components/flashcard-detail"

function FlashcardDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 py-8">
      <Skeleton className="h-9 w-3/4" />

      <Skeleton className="h-14 w-full" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>

      <Skeleton className="h-5 w-48" />

      <div className="flex flex-col gap-y-6">
        {[...Array(4)].map((_, index) => (
          <FlashcardDetailSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}

export default FlashcardDetailLoading
