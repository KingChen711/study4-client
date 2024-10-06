"use server"

import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"
import { type TSubmitFlashcardExamSchema } from "@/lib/validation/flashcard"

export const submitFlashcardExam = async (
  body: TSubmitFlashcardExamSchema
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.post("/api/flashcards/exam/submission", body, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    //TODO:revalidate history

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
