import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

import whoAmI from "../users/who-am-i"

const mockData = {
  testHistory: {
    testHistoryId: 6,
    totalRightAnswer: 26,
    totalWrongAnswer: 13,
    totalSkipAnswer: 1,
    totalQuestion: 40,
    totalCompletionTime: 2442,
    takenDate: "2024-11-02T15:48:08.66",
    accuracyRate: 0.65,
    isFull: false,
    testType: "Listening",
    bandScore: "9.0",
    userId: "ee1861e8-3e68-ef11-9851-d03c1f563019",
    user: null,
    testId: "f81861e8-3e68-ef11-9851-d03c1f563019",
    test: null,
    testCategoryId: 0,
    testCategory: null,
    partitionHistories: [],
  },
  sectionHistories: [
    {
      sectionName: "Recording 1",
      totalRightAnswer: 8,
      totalWrongAnswer: 2,
      totalSkipAnswer: 0,
      accuracyRate: 0.8,
      partitionHistories: [
        {
          partitionHistoryId: 1,
          testSectionName: "Recording 1",
          totalRightAnswer: 8,
          totalWrongAnswer: 2,
          totalSkipAnswer: 0,
          accuracyRate: 0.6,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 1,
              gradeStatus: "Wrong",
              questionNumber: 1,
              rightAnswer: "A",
              inputedAnswer: "B",
              questionId: 1,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 2,
              gradeStatus: "Correct",
              questionNumber: 2,
              rightAnswer: "B",
              inputedAnswer: "B",
              questionId: 2,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 3,
              gradeStatus: "Correct",
              questionNumber: 3,
              rightAnswer: "C",
              inputedAnswer: "C",
              questionId: 3,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 4,
              gradeStatus: "Correct",
              questionNumber: 4,
              rightAnswer: "D",
              inputedAnswer: "D",
              questionId: 4,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 5,
              gradeStatus: "Correct",
              questionNumber: 5,
              rightAnswer: "May 26th",
              inputedAnswer: "May 26th",
              questionId: 5,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 6,
              gradeStatus: "Skip",
              questionNumber: 6,
              rightAnswer: "F",
              inputedAnswer: "",
              questionId: 6,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 7,
              gradeStatus: "Wrong",
              questionNumber: 7,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 7,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 8,
              gradeStatus: "Correct",
              questionNumber: 8,
              rightAnswer: "A",
              inputedAnswer: "A",
              questionId: 8,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 9,
              gradeStatus: "Skip",
              questionNumber: 9,
              rightAnswer: "A",
              inputedAnswer: "",
              questionId: 9,
              partitionHistoryId: 1,
            },
            {
              testGradeId: 10,
              gradeStatus: "Wrong",
              questionNumber: 10,
              rightAnswer: "G",
              inputedAnswer: "B",
              questionId: 10,
              partitionHistoryId: 1,
            },
          ],
          testSectionPartId: 1,
          testSectionPart: {
            testSectionPartId: 1,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 1,
            partitionTag: {
              partitionTagId: 1,
              partitionTagDesc: "[Listening] Note/Form Completion",
            },
            questions: [],
            testSectionId: 0,
          },
        },
      ],
    },
    {
      sectionName: "Recording 2",
      totalRightAnswer: 13,
      totalWrongAnswer: 7,
      totalSkipAnswer: 0,
      accuracyRate: 1.3,
      partitionHistories: [
        {
          partitionHistoryId: 2,
          testSectionName: "Recording 2",
          totalRightAnswer: 7,
          totalWrongAnswer: 3,
          totalSkipAnswer: 0,
          accuracyRate: 0.375,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 11,
              gradeStatus: "Wrong",
              questionNumber: 11,
              rightAnswer: "G",
              inputedAnswer: "B",
              questionId: 11,
              partitionHistoryId: 2,
            },
            {
              testGradeId: 12,
              gradeStatus: "Wrong",
              questionNumber: 12,
              rightAnswer: "G",
              inputedAnswer: "B",
              questionId: 12,
              partitionHistoryId: 2,
            },
            {
              testGradeId: 13,
              gradeStatus: "Wrong",
              questionNumber: 13,
              rightAnswer: "G",
              inputedAnswer: "B",
              questionId: 13,
              partitionHistoryId: 2,
            },
            {
              testGradeId: 14,
              gradeStatus: "Correct",
              questionNumber: 14,
              rightAnswer: "A",
              inputedAnswer: "A",
              questionId: 14,
              partitionHistoryId: 2,
            },
            {
              testGradeId: 15,
              gradeStatus: "Correct",
              questionNumber: 15,
              rightAnswer: "G",
              inputedAnswer: "G",
              questionId: 15,
              partitionHistoryId: 2,
            },
          ],
          testSectionPartId: 2,
          testSectionPart: {
            testSectionPartId: 2,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 2,
            partitionTag: {
              partitionTagId: 2,
              partitionTagDesc: "[Listening] Table Completion",
            },
            questions: [],
            testSectionId: 0,
          },
        },
        {
          partitionHistoryId: 3,
          testSectionName: "Recording 2",
          totalRightAnswer: 6,
          totalWrongAnswer: 4,
          totalSkipAnswer: 0,
          accuracyRate: 0.2,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 16,
              gradeStatus: "Wrong",
              questionNumber: 16,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 16,
              partitionHistoryId: 3,
            },
            {
              testGradeId: 17,
              gradeStatus: "Wrong",
              questionNumber: 17,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 17,
              partitionHistoryId: 3,
            },
            {
              testGradeId: 18,
              gradeStatus: "Wrong",
              questionNumber: 18,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 18,
              partitionHistoryId: 3,
            },
            {
              testGradeId: 19,
              gradeStatus: "Wrong",
              questionNumber: 19,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 19,
              partitionHistoryId: 3,
            },
            {
              testGradeId: 20,
              gradeStatus: "Wrong",
              questionNumber: 20,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 20,
              partitionHistoryId: 3,
            },
          ],
          testSectionPartId: 3,
          testSectionPart: {
            testSectionPartId: 3,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 3,
            partitionTag: {
              partitionTagId: 3,
              partitionTagDesc: "[Listening] Multiple Choice",
            },
            questions: [],
            testSectionId: 0,
          },
        },
      ],
    },
    {
      sectionName: "Recording 3",
      totalRightAnswer: 14,
      totalWrongAnswer: 6,
      totalSkipAnswer: 0,
      accuracyRate: 1.4,
      partitionHistories: [
        {
          partitionHistoryId: 4,
          testSectionName: "Recording 3",
          totalRightAnswer: 5,
          totalWrongAnswer: 5,
          totalSkipAnswer: 0,
          accuracyRate: 0.4,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 21,
              gradeStatus: "Correct",
              questionNumber: 21,
              rightAnswer: "G",
              inputedAnswer: "G",
              questionId: 21,
              partitionHistoryId: 4,
            },
            {
              testGradeId: 22,
              gradeStatus: "Wrong",
              questionNumber: 22,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 22,
              partitionHistoryId: 4,
            },
            {
              testGradeId: 23,
              gradeStatus: "Wrong",
              questionNumber: 23,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 23,
              partitionHistoryId: 4,
            },
            {
              testGradeId: 24,
              gradeStatus: "Wrong",
              questionNumber: 24,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 24,
              partitionHistoryId: 4,
            },
            {
              testGradeId: 25,
              gradeStatus: "Wrong",
              questionNumber: 25,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 25,
              partitionHistoryId: 4,
            },
          ],
          testSectionPartId: 4,
          testSectionPart: {
            testSectionPartId: 4,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 4,
            partitionTag: {
              partitionTagId: 4,
              partitionTagDesc: "[Listening] Note/Form Completion",
            },
            questions: [],
            testSectionId: 0,
          },
        },
        {
          partitionHistoryId: 5,
          testSectionName: "Recording 3",
          totalRightAnswer: 9,
          totalWrongAnswer: 1,
          totalSkipAnswer: 0,
          accuracyRate: 0.8,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 26,
              gradeStatus: "Wrong",
              questionNumber: 26,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 26,
              partitionHistoryId: 5,
            },
            {
              testGradeId: 27,
              gradeStatus: "Wrong",
              questionNumber: 27,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 27,
              partitionHistoryId: 5,
            },
            {
              testGradeId: 28,
              gradeStatus: "Wrong",
              questionNumber: 28,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 28,
              partitionHistoryId: 5,
            },
            {
              testGradeId: 29,
              gradeStatus: "Wrong",
              questionNumber: 29,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 29,
              partitionHistoryId: 5,
            },
            {
              testGradeId: 30,
              gradeStatus: "Wrong",
              questionNumber: 30,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 30,
              partitionHistoryId: 5,
            },
          ],
          testSectionPartId: 5,
          testSectionPart: {
            testSectionPartId: 5,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 5,
            partitionTag: {
              partitionTagId: 5,
              partitionTagDesc: "[Listening] Table Completion",
            },
            questions: [],
            testSectionId: 0,
          },
        },
      ],
    },
    {
      sectionName: "Recording 4",
      totalRightAnswer: 15,
      totalWrongAnswer: 4,
      totalSkipAnswer: 1,
      accuracyRate: 1.5,
      partitionHistories: [
        {
          partitionHistoryId: 6,
          testSectionName: "Recording 4",
          totalRightAnswer: 8,
          totalWrongAnswer: 2,
          totalSkipAnswer: 0,
          accuracyRate: 0.1,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 31,
              gradeStatus: "Wrong",
              questionNumber: 31,
              rightAnswer: "A",
              inputedAnswer: "B",
              questionId: 31,
              partitionHistoryId: 6,
            },
            {
              testGradeId: 32,
              gradeStatus: "Correct",
              questionNumber: 32,
              rightAnswer: "B",
              inputedAnswer: "B",
              questionId: 32,
              partitionHistoryId: 6,
            },
            {
              testGradeId: 33,
              gradeStatus: "Correct",
              questionNumber: 33,
              rightAnswer: "C",
              inputedAnswer: "C",
              questionId: 33,
              partitionHistoryId: 6,
            },
            {
              testGradeId: 34,
              gradeStatus: "Correct",
              questionNumber: 34,
              rightAnswer: "D",
              inputedAnswer: "D",
              questionId: 34,
              partitionHistoryId: 6,
            },
            {
              testGradeId: 35,
              gradeStatus: "Correct",
              questionNumber: 35,
              rightAnswer: "May 26th",
              inputedAnswer: "May 26th",
              questionId: 35,
              partitionHistoryId: 6,
            },
          ],
          testSectionPartId: 6,
          testSectionPart: {
            testSectionPartId: 6,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 6,
            partitionTag: {
              partitionTagId: 6,
              partitionTagDesc: "[Listening] Summary/Flow chart Completion",
            },
            questions: [],
            testSectionId: 0,
          },
        },
        {
          partitionHistoryId: 7,
          testSectionName: "Recording 4",
          totalRightAnswer: 7,
          totalWrongAnswer: 2,
          totalSkipAnswer: 1,
          accuracyRate: 0,
          totalQuestion: 10,
          testHistoryId: 6,
          testGrades: [
            {
              testGradeId: 36,
              gradeStatus: "Skip",
              questionNumber: 36,
              rightAnswer: "F",
              inputedAnswer: "",
              questionId: 36,
              partitionHistoryId: 7,
            },
            {
              testGradeId: 37,
              gradeStatus: "Wrong",
              questionNumber: 37,
              rightAnswer: "C",
              inputedAnswer: "D",
              questionId: 37,
              partitionHistoryId: 7,
            },
            {
              testGradeId: 38,
              gradeStatus: "Correct",
              questionNumber: 38,
              rightAnswer: "A",
              inputedAnswer: "A",
              questionId: 38,
              partitionHistoryId: 7,
            },
            {
              testGradeId: 39,
              gradeStatus: "Skip",
              questionNumber: 39,
              rightAnswer: "A",
              inputedAnswer: "",
              questionId: 39,
              partitionHistoryId: 7,
            },
            {
              testGradeId: 40,
              gradeStatus: "Wrong",
              questionNumber: 40,
              rightAnswer: "G",
              inputedAnswer: "B",
              questionId: 40,
              partitionHistoryId: 7,
            },
          ],
          testSectionPartId: 7,
          testSectionPart: {
            testSectionPartId: 7,
            partitionDesc: null,
            isVerticalLayout: false,
            partitionImage: null,
            partitionTagId: 7,
            partitionTag: {
              partitionTagId: 7,
              partitionTagDesc: "[Listening] Matching",
            },
            questions: [],
            testSectionId: 0,
          },
        },
      ],
    },
  ],
}

export interface TestHistoryDetail {
  testHistory: TestHistory
  sectionHistories: SectionHistory[]
}

export interface TestHistory {
  testHistoryId: number
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  totalQuestion: number
  totalCompletionTime: number
  takenDate: string
  accuracyRate: number
  isFull: boolean
  testType: string
  bandScore: string
}

export interface SectionHistory {
  sectionName: string
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  accuracyRate: number
  partitionHistories: PartitionHistory[]
}

export interface PartitionHistory {
  partitionHistoryId: number
  testSectionName: string
  totalRightAnswer: number
  totalWrongAnswer: number
  totalSkipAnswer: number
  accuracyRate: number
  totalQuestion: number
  testHistoryId: number
  testGrades: TestGrade[]
  testSectionPartId: number
  testSectionPart: TestSectionPart
}

export interface TestGrade {
  testGradeId: number
  gradeStatus: "Skip" | "Correct" | "Wrong"
  questionNumber: number
  rightAnswer: string
  inputedAnswer: string
  questionId: number
  partitionHistoryId: number
}

export interface TestSectionPart {
  testSectionPartId: number
  partitionDesc: string | null
  isVerticalLayout: boolean
  partitionImage: string | null
  partitionTagId: number
  partitionTag: PartitionTag
  testSectionId: number
}

export interface PartitionTag {
  partitionTagId: number
  partitionTagDesc: string
}

type Params = {
  historyId: string
}

const getHistory = cache(
  async (params: Params): Promise<TestHistoryDetail | null> => {
    try {
      const { data } = await prep4Api.get<{ data: TestHistoryDetail }>(
        `/api/test-histories/${params.historyId}`
      )

      return data.data || null
    } catch (error) {
      // console.log(error.response.data)
      return null
    }
    // return mockData
  }
)

export default getHistory
