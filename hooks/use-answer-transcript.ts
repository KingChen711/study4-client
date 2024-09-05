"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

export type AnswerTranscript = {
  partitionHistoryId: number
  testSectionName: string
  totalQuestion: number
  testHistoryId: number
  testGrades: TestGrade[]
  testSectionPartId: number
  testSectionPart: TestSectionPart
}

export type TestGrade = {
  testGradeId: number
  gradeStatus: string
  questionNumber: number
  rightAnswer: string
  inputedAnswer: string
  questionId: number
  question: Question
  partitionHistoryId: number
}

export type Question = {
  questionId: number
  questionDesc: string
  questionAnswerExplanation: string | null
  questionNumber: number
  isMultipleChoice: boolean
  questionAnswers: QuestionAnswer[]
  testSectionPartId: number
}

export type QuestionAnswer = {
  questionAnswerId: number
  answerDisplay: string
  answerText: string
  isTrue: boolean
  questionId: number
}

export type TestSectionPart = {
  testSectionPartId: number
  partitionDesc: string
  isVerticalLayout: boolean
  partitionTagId: number
  partitionTag: PartitionTag
  cloudResource: { url: string } | null
  testSectionId: number
}

export type PartitionTag = {
  partitionTagId: number
  partitionTagDesc: string
}

type Params = {
  partitionId: number
  gradeId: number
}

function useAnswerTranscript({ gradeId, partitionId }: Params) {
  return useQuery({
    queryKey: [
      "test-histories",
      "partitions",
      partitionId,
      "test-grades",
      gradeId,
    ],
    queryFn: async () => {
      return prep4Api
        .get<{ data: AnswerTranscript | null }>(
          `/api/test-histories/partitions/${partitionId}/test-grades/${gradeId}`
        )
        .then((res) => res.data.data || null)
        .catch((_: Error) => {
          return null
        })
    },

    placeholderData: keepPreviousData,
  })
}

export default useAnswerTranscript
