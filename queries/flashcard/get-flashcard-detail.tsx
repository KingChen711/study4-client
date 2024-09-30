import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export type FlashcardOrderBy = "-createDate" | "-totalEngaged"

type Flashcard = {
  flashcardId: number
  title: string
  totalWords: number
  totalView: number
  description: string | null
  createDate: Date
  flashcardDetails: FlashcardDetail[]
}

type FlashcardDetail = {
  flashcardDetailId: number
  wordText: string
  definition: string
  wordForm: string
  wordPronunciation: string
  example: string
  description: string
  cloudResourceId: number
  cloudResource: {
    url: string
  }
  flashcardId: number
  flashcardDetailTagId: null
}

const getFlashcardDetail = cache(
  async (id: number): Promise<Flashcard | null> => {
    try {
      const { data } = await prep4Api.get<{ data: Flashcard }>(
        `/api/flashcards/${id}`
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getFlashcardDetail
