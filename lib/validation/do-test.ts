import z from "zod"

export const submitTestSchema = z.object({
  testId: z.number().int(),
  totalCompletionTime: z.number().int(),
  isFull: z.boolean(),
  takenDateTime: z.date(),
  questionAnswers: z.array(
    z.object({
      questionId: z.number(),
      selectedAnswer: z.string().trim().catch(""),
    })
  ),
})

export type TSubmitTestSchema = z.infer<typeof submitTestSchema>

export const resubmitTestSchema = z.object({
  testId: z.number().int(),
  testHistoryId: z.number().int(),
  totalCompletionTime: z.number().int(),
  takenDateTime: z.date(),
  testGrades: z.array(
    z.object({
      questionId: z.number(),
      inputedAnswer: z.string().trim().catch(""),
    })
  ),
})

export type TResubmitTestSchema = z.infer<typeof resubmitTestSchema>
