import React from "react"
import Link from "next/link"
import getPublicFlashcards from "@/queries/flashcard/get-public-flashcards"
import { z } from "zod"

import Paginator from "@/components/ui/paginator"

import Flashcard from "../_components/flashcard"

const flashcardsParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
})

type Props = {
  searchParams: {
    page?: string
  }
}

async function FlashcardsDiscoveryPage({ searchParams }: Props) {
  const { page } = flashcardsParamsSchema.parse(searchParams)
  const { flashcards, totalPage } = await getPublicFlashcards({
    page,
    pageSize: 12,
  })

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
        {flashcards.map((flashcard) => (
          <Flashcard
            isAdded={!!flashcard.userFlashcards?.[0]}
            key={flashcard.flashcardId}
            id={flashcard.flashcardId}
            title={flashcard.title}
            description={flashcard.description}
            totalView={flashcard.totalView}
            totalWords={flashcard.totalWords}
          />
        ))}
      </div>

      {flashcards.length > 0 && (
        <Paginator
          metadata={{
            pageNumber: page,
            totalPages: totalPage,
          }}
        />
      )}
    </div>
  )
}

export default FlashcardsDiscoveryPage
