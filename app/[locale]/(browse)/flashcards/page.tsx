import React from "react"
import Link from "next/link"

import { Icons } from "@/components/ui/icons"

function FlashCardsPage() {
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
        <div className="flex size-48 cursor-pointer flex-col items-center justify-center rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow hover:shadow-primary">
          <Icons.Plus className="size-6 text-primary" />
          <p className="mt-3 text-sm font-medium">Tạo học phần mới</p>
        </div>
        <div className="mb-6 mt-4 grid grid-cols-12 gap-4">
          {/* {flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard.flashcardId}
              id={flashcard.flashcardId}
              title={flashcard.title}
              totalView={flashcard.totalView}
              totalWords={flashcard.totalWords}
            />
          ))} */}
        </div>
      </div>
    </div>
  )
}

export default FlashCardsPage
