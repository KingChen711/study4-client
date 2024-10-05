"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"
import { type TCreateFlashcardSchema } from "@/lib/validation/flashcard"

export const updateFlashcard = async (
  flashcardId: number,
  body: TCreateFlashcardSchema
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.put(`/api/flashcards/${flashcardId}/privacy/update`, body, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    revalidatePath(`/flashcards`)
    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
