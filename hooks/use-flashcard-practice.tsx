"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type Question = {
  flashcardDetailId: number
  questionNumber: number
  questionTitle: string
  questionDesc: string | null
  questionAnswers: { imageUrl: string | null; answerText: string }[]
  matchingQuestions: {
    flashcardDetailId: number
    questionNumber: number
    questionTitle: string
    questionDesc: string | null
  }[]
  questionType:
    | "Matching question"
    | "True/False"
    | "Multiple choice"
    | "Written"
}

type TUseFlashcardPractice = {
  totalQuestion: number
  isTermPattern: boolean
  questionTypes: string[]
}

function useFlashcardPractice(
  enabled: boolean,
  flashcardId: number,
  params: TUseFlashcardPractice
) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["flashcards", flashcardId, "exam", { params }],
    enabled,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      return prep4Api
        .get<{ data: Question[] }>(
          `/api/flashcards/${flashcardId}/exam?${params.questionTypes.map((qt) => `questionTypes=${qt}`).join("&")}`,
          {
            params: {
              ...params,
              questionTypes: undefined,
            },
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
        .then((res) => res.data.data || ([] as Question[]))
        .catch((_: Error) => {
          return [] as Question[]
        })
    },
  })
}

export default useFlashcardPractice
