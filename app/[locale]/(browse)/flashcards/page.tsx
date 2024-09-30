import React from "react"
import Link from "next/link"

function FlashCardsPage() {
  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">Flashcards</h2>
      <div className="flex items-center gap-x-4">
        <div className="rounded-xl border bg-primary/10 px-4 py-1 font-medium text-primary">
          List từ của tôi
        </div>
        <Link
          href="/flashcards/discover"
          className="rounded-xl border px-4 py-1"
        >
          Khám phá
        </Link>
      </div>
    </div>
  )
}

export default FlashCardsPage
