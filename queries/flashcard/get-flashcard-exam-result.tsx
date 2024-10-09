import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type FlashcardOrderBy = "-createDate" | "-totalEngaged"

type FlashcardExamResult = {
  flashcardExamHistoryId: number
  totalQuestion: number
  totalRightAnswer: number
  totalWrongAnswer: number
  totalCompletionTime: number
  accuracyRate: number
  takenDate: Date
  userFlashcardId: number
  flashcardExamGrades: {
    flashcardExamGradeId: number
    questionTitle: string
    questionDesc: string
    questionNumber: number
    correctAnswer: string
    userAnswer: string
    flashcardGradeStatus: "Wrong" | "Correct"
    flashcardExamHistoryId: number
    questionType:
      | "Written"
      | "Multiple choice"
      | "True/False"
      | "Matching question"
    flashcardDetailId: number
  }[]
}

const getFlashcardExamResult = cache(
  async (
    flashcardId: number,
    takenDateTime: string
  ): Promise<FlashcardExamResult | null> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: FlashcardExamResult | null }>(
        `/api/flashcards/${flashcardId}/exam/result?takenDateTime=${takenDateTime}`,
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

export default getFlashcardExamResult
