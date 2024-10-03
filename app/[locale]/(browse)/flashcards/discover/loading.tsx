import React from "react"
import Link from "next/link"

import { FlashcardSkeleton } from "../_components/flashcard"

function DiscoveryLoading() {
  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">Flashcards</h2>
      <div className="flex items-center gap-x-4">
        <Link href="/flashcards" className="rounded-xl border px-4 py-1">
          Của tôi
        </Link>

        <div className="rounded-xl border bg-primary/10 px-4 py-1 font-medium text-primary">
          Khám phá
        </div>
      </div>

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
  )
}

export default DiscoveryLoading
