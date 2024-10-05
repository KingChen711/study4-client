import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type FlashcardOrderBy = "-createDate" | "-totalEngaged"

type FlashcardPractice = {
  userFlashcardId: number
  userFlashcardProgresses: UserFlashcardProgress[]
}

export type UserFlashcardProgress = {
  userFlashcardProgressId?: number
  progressStatus?: "NEW" | "STUDYING" | "PROFICIENT" | "STARRED"
  flashcardDetailId?: number
} & FlashcardDetail

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

const getFlashcardPractice = cache(
  async (id: number): Promise<FlashcardPractice | null> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: FlashcardPractice | null }>(
        `/api/flashcards/${id}/practice`,
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

export default getFlashcardPractice
