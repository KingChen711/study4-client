import React from "react"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"

import { FlashcardSkeleton } from "./_components/flashcard"

function MyFlashcardsLoading() {
  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">Flashcards</h2>
      <div className="flex items-center gap-x-4">
        <div className="rounded-xl border bg-primary/10 px-4 py-1 font-medium text-primary">
          Của tôi
        </div>

        <Link
          href="/flashcards/discover"
          className="rounded-xl border px-4 py-1"
        >
          Khám phá
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-y-4">
        <Skeleton className="h-[58px] w-full" />

        <div className="mb-6 mt-4 grid grid-cols-12 gap-4">
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
          <FlashcardSkeleton />
        </div>
      </div>
    </div>
  )
}

export default MyFlashcardsLoading
