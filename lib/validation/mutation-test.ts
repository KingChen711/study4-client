import { cloudResourceSchema, type TestType } from "@/types"
import z from "zod"

import { testTypeToSectionPrefix } from "@/app/[locale]/(member)/staff/tests/_components/sections-field"

import { indexToAlphabet } from "../utils"

const questionAnswerSchema = z.object({
  answerDisplay: z
    .string()
    .optional()
    .transform((data) => (data === "" ? undefined : data)), //if empty -> undefined
  answerText: z.string().min(1, "Require"),
  isTrue: z.boolean(),
})

const questionSchema = z
  .object({
    questionDesc: z
      .string()
      .optional()
      .transform((data) => (data === "" ? undefined : data)) //if empty -> undefined
      .refine(
        (value) => !value || value?.length >= 5,
        "Question title must be at least 5 characters or empty"
      )
      .refine(
        (value) => !value || value?.length <= 255,
        "Question title must not exceed 255 characters or empty"
      ),
    questionAnswerExplanation: z
      .string()
      .optional()
      .transform((data) => (data === "" ? undefined : data)), //if empty -> undefined,
    //will be remove on transform
    answerDisplay: z
      .string()
      .optional()
      .transform((data) => (data === "" ? undefined : data)), //if empty -> undefined,
    //calculate on submit
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
    path: ["answerDisplay"],
  })
  .refine(
    (data) =>
      !data.isMultipleChoice || data.questionAnswers.find((qa) => qa.isTrue),
    {
      message: "Multiple choice question need a correct option",
      path: ["questionAnswers"],
    }
  )
  .transform((data) => {
    if (!data.isMultipleChoice) {
      data.questionAnswers = data.questionAnswers.map((qa) => {
        qa.answerDisplay = data.answerDisplay
        return qa
      })
      data.answerDisplay = undefined
      return data
    }

    data.questionAnswers = data.questionAnswers.map((qa, i) => {
      qa.answerDisplay = indexToAlphabet(i)
      return qa
    })

    return data
  })

const testSectionPartitionSchema = z.object({
  partitionDesc: z.string().min(1, "Partition description is require"),

  //serialize to cloudResource on Submit
  imageUrl: z.string().optional(),
  imageFile: z.any().optional(),
  cloudResource: cloudResourceSchema.optional(),

  partitionTagId: z
    .number()
    .optional()
    //problem with initial without partition tag, so check require by refine
    .refine((value) => !!value, "Partition tag is required"),
  questions: z.array(questionSchema),
})

export const testSectionSchema = z
  .object({
    //add on submit
    testSectionName: z.string().optional(),
    readingDesc: z
      .string()
      .optional()
      .transform((data) => (data === "" ? undefined : data)), //if empty -> undefined,

    //serialize to cloudResource on Submit
    audioUrl: z.string().optional(),
    audioFile: z.any().optional(),
    cloudResource: cloudResourceSchema.optional(),

    //calculate on transform
    totalQuestion: z.number().int().nonnegative(),
    sectionTranscript: z
      .string()
      .optional()
      .transform((data) => (data === "" ? undefined : data)), //if empty -> undefined,
    //remove on submit
    testType: z
      .enum(["Listening", "Reading", "Speaking", "Writing"])
      .optional(),
    testSectionPartitions: z.array(testSectionPartitionSchema),
  })
  .refine((data) => data.testType !== "Reading" || !!data.readingDesc, {
    path: ["readingDesc"],
    message: "Reading passage is require",
  })
  .transform((data) => {
    if (data.testType !== "Reading") {
      data.readingDesc = undefined
    }
    return data
  })
  .refine((data) => data.testType !== "Listening" || !!data.audioUrl, {
    path: ["audioUrl"],
    message: "Audio resource is require",
  })
  .transform((data) => {
    if (data.testType !== "Listening") {
      data.audioFile = undefined
      data.audioUrl = undefined
      data.cloudResource = undefined
      data.sectionTranscript = undefined
    }
    return data
  })
  .transform((data) => {
    data.testType = undefined
    data.totalQuestion = data.testSectionPartitions.flatMap(
      (sp) => sp.questions
    ).length
    return data
  })

export const mutationTestSchema = z
  .object({
    testTitle: z
      .string()
      .trim()
      .min(10, "Test title must be at least 10 characters")
      .max(155, "Test title must not exceed 155 characters"),
    duration: z.coerce
      .number({ message: "Expected number" })
      .int()
      .min(1, "Duration is at least 1 minutes")
      .transform((value) => value * 60),
    testType: z.enum(["Listening", "Reading", "Speaking", "Writing"]),
    //calculate on transform
    totalQuestion: z.number().int().nonnegative(),
    //calculate on transform
    totalSection: z.number().int().nonnegative(),
    testCategoryId: z.number().int().nonnegative(),
    tags: z.array(z.number()).catch([]),
    testSections: z.array(testSectionSchema),
  })
  .transform((data) => {
    data.testSections = data.testSections.map((ts, i) => {
      ts.testSectionName = `${testTypeToSectionPrefix[data.testType]} ${i + 1}`
      return ts
    })

    data.totalSection = data.testSections.length

    data.totalQuestion = data.testSections.reduce(
      (cur, ts) => cur + ts.totalQuestion,
      0
    )

    let countQuestionNumber = 1
    data.testSections.forEach((ts) =>
      ts.testSectionPartitions.forEach((tsp) =>
        tsp.questions.forEach((q) => {
          q.questionNumber = countQuestionNumber++
        })
      )
    )

    return data
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
