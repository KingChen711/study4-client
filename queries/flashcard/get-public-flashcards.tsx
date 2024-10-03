import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type FlashcardOrderBy = "-createDate" | "-totalEngaged"

type Params = {
  pageSize: number
  page: number
}

type Flashcard = {
  flashcardId: number
  title: string
  totalWords: number
  totalView: number
  description: string | null
  createDate: Date
  userFlashcards: { userId: number }[]
}

type GetPublicFlashcardsResult = {
  flashcards: Flashcard[]
  page: number
  totalPage: number
}

const getPublicFlashcards = cache(
  async (params: Params): Promise<GetPublicFlashcardsResult> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: GetPublicFlashcardsResult }>(
        "/api/flashcards",
        {
          params,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      )

      return data.data || { page: 0, totalPage: 0, flashcards: [] }
    } catch (error) {
      return { page: 0, totalPage: 0, flashcards: [] }
    }
  }
)

export default getPublicFlashcards
