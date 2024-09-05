export type DoTest = {
  id: number
  testId: string
  testTitle: string
  duration: number
  testType: "Listening" | "Reading" | "Writing"
  totalEngaged: number
  totalQuestion: number
  totalSection: number
  tags: Tag[]
  testHistories: unknown[]
  testSections: TestSection[]
}

export type TestSection = {
  testSectionId: number
  testSectionName: string
  totalQuestion: number
  cloudResource: { url: string | null } | null
  readingDesc: string | null
  testSectionPartitions: Partition[]
}

export type Partition = {
  isVerticalLayout: boolean
  testSectionPartId: number
  partitionDesc: string
  questions: Question[]
}

export type Question = {
  isMultipleChoice: boolean
  questionId: number
  questionNumber: number
  questionDesc: string
  questionAnswers: QuestionAnswer[]
}

type QuestionAnswer = {
  questionAnswerId: number
  answerText: string
}

type Tag = {
  tagId: number
  tagName: string
}
