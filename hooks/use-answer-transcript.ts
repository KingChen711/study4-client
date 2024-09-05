"use client"

import { keepPreviousData, useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type AnswerTranscript = {
  partitionHistoryId: number
  testSectionName: string
  testHistoryId: number
  testGrade: {
    testGradeId: number
    gradeStatus: "Wrong" | "Correct" | "Skip"
    questionNumber: number
    rightAnswer: string
    inputedAnswer: string
    questionId: number
    partitionHistoryId: number
  }
  testSectionPartId: number
  testSectionPart: {
    testSectionPartId: number
    partitionDesc: string
    isVerticalLayout: false
    partitionTagId: 1
    partitionTag: {
      partitionTagId: 1
      partitionTagDesc: string
    }
    cloudResourceId: null
    cloudResource: null
    testSectionId: 13
  }
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
      //   return prep4Api
      //     .get<{ data: AnswerTranscript | null }>(
      //       `/api/test-histories/partitions/${partitionId}/test-grades/${gradeId}`
      //     )
      //     .then((res) => res.data.data || null)
      //     .catch((_: Error) => {
      //       return null
      //     })

      return {
        partitionHistoryId: 50,
        testSectionName: "Recording 1",
        totalRightAnswer: null,
        totalWrongAnswer: null,
        totalSkipAnswer: null,
        accuracyRate: null,
        totalQuestion: 0,
        testHistoryId: 13,
        testGrade: {
          testGradeId: 146,
          gradeStatus: "Wrong",
          questionNumber: 6,
          rightAnswer: "APARTMENT",
          inputedAnswer: "gdfg",
          questionId: 126,
          partitionHistoryId: 50,
        },
        testSectionPartId: 22,
        testSectionPart: {
          testSectionPartId: 22,
          partitionDesc: "This is description for Partition 1",
          isVerticalLayout: false,
          partitionTagId: 1,
          partitionTag: {
            partitionTagId: 1,
            partitionTagDesc: "[Listening] Note/Form Completion",
          },
          cloudResourceId: null,
          cloudResource: null,
          questions: [],
          testSectionId: 13,
        },
      }
    },

    placeholderData: keepPreviousData,
  })
}

export default useAnswerTranscript
