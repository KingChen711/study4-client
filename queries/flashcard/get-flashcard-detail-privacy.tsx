import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type FlashcardOrderBy = "-createDate" | "-totalEngaged"

type Flashcard = {
  flashcardId: number
  title: string
  totalWords: number
  totalView: number
  description: string | null
  isPublic: boolean
  createDate: Date
  newFlashCardDetails: FlashcardDetail[]
  studyingFlashCardDetails: FlashcardDetail[]
  proficientFlashCardDetails: FlashcardDetail[]
  starredFlashCardDetails: FlashcardDetail[]
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
  } | null
  flashcardId: number
  flashcardDetailTagId: null
}

const getFlashcardDetailPrivacy = cache(
  async (id: number): Promise<Flashcard | null> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: Flashcard }>(
        `/api/flashcards/${id}/privacy`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      return data.data || null
    } catch (error) {
      return null
    }
  }
)

export default getFlashcardDetailPrivacy
