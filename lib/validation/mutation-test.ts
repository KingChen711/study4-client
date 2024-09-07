import { type TestType } from "@/types"
import z from "zod"

const questionAnswerSchema = z.object({
  answerDisplay: z.string().optional(),
  answerText: z.string().min(1, "Require"),
  isTrue: z.boolean(),
})

const questionSchema = z
  .object({
    questionDesc: z.string().optional(),
    questionAnswerExplanation: z.string().optional(),
    //remove on submit
    answerDisplay: z.string().optional(),
    //define on submit
    questionNumber: z.number().optional(),
    isMultipleChoice: z.boolean(),
    questionAnswers: z
      .array(questionAnswerSchema)
      .min(1, "Question need at least one answer"),
  })
  .refine((data) => !data.isMultipleChoice || !!data.questionDesc, {
    message: "Question title is require in multiple choice question",
    path: ["questionDesc"],
  })
  .refine((data) => data.isMultipleChoice || !!data.answerDisplay, {
    message: "Answer display is required",
    path: ["questionDesc"],
  })
  .refine(
    (data) =>
      !data.isMultipleChoice || data.questionAnswers.find((qa) => qa.isTrue),
    {
      message: "Multiple choice question need a correct option",
      path: ["questionAnswers"],
    }
  )

const testSectionPartitionSchema = z.object({
  partitionDesc: z.string().min(1, "Partition description is require"),
  //TODO: serialize to cloudResource on Submit
  imageResource: z.string().optional(),
  partitionTagId: z
    .number()
    .optional()
    //problem with initial without parition tag, so check require by refine
    .refine((value) => !!value, "Partition tag is required"),
  questions: z.array(questionSchema),
})

const testSectionSchema = z
  .object({
    //TODO: add on submit
    // testSectionName: z.string().min(1, "Section name is require"),
    totalQuestion: z.number().int().nonnegative(),
    sectionTranscript: z.string().optional(),
    readingDesc: z.string().optional(),
    //TODO: remove on submit
    testType: z.enum(["Listening", "Reading", "Speaking", "Writing"]),
    //TODO: serialize to cloudResource on Submit
    audioResource: z.string().optional(),
    testSectionPartitions: z.array(testSectionPartitionSchema),
  })
  .refine((data) => data.testType !== "Reading" || !!data.readingDesc, {
    path: ["readingDesc"],
    message: "Reading passage is require",
  })
  .refine((data) => data.testType !== "Listening" || !!data.audioResource, {
    path: ["audioResource"],
    message: "Audio resource is require",
  })

export const mutationTestSchema = z.object({
  testTitle: z.string().trim().min(1, "Test title is required"),
  duration: z.coerce
    .number({ message: "Expected number" })
    .int()
    .min(1, "Duration is at least 1 minutes")
    .transform((value) => value * 60),
  testType: z.enum(["Listening", "Reading", "Speaking", "Writing"]),
  totalQuestion: z.number().int().nonnegative(),
  totalSection: z.number().int().nonnegative(),
  testCategoryId: z.number().int().nonnegative(),
  tags: z.array(z.number()).catch([]),
  testSections: z.array(testSectionSchema),
})

export type TMutationTestSchema = z.infer<typeof mutationTestSchema>

type TCreateSection = {
  testType: TestType
}

export const createSection = ({
  testType,
}: TCreateSection): z.infer<typeof testSectionSchema> => {
  return {
    testType,
    totalQuestion: 0,
    testSectionPartitions: [
      {
        partitionDesc: "",
        questions: [],
      },
    ],
  }
}
