import React from "react"
import Link from "next/link"
import getMyFlashcards from "@/queries/flashcard/get-my-flashcards"
import { z } from "zod"

import Paginator from "@/components/ui/paginator"

import CreateNewFlashcardDialog from "./_components/create-new-flashcard-dialog"
import Flashcard from "./_components/flashcard"

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

async function FlashcardsPage({ searchParams }: Props) {
  const { page } = flashcardsParamsSchema.parse(searchParams)
  const { flashcards, totalPage } = await getMyFlashcards({
    page,
    pageSize: 12,
  })

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
        <CreateNewFlashcardDialog />
        <div className="mb-6 grid grid-cols-12 gap-4">
          {flashcards.map((flashcard) => (
            <Flashcard
              key={flashcard.flashcardId}
              id={flashcard.flashcardId}
              title={flashcard.title}
              totalView={flashcard.totalView}
              totalWords={flashcard.totalWords}
              description={flashcard.description}
              showAdded={false}
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
    </div>
  )
}

export default FlashcardsPage
