"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const deleteWord = async (
  flashcardId: number,
  flashcardDetailId: number
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.delete(
      `/api/flashcard-details/${flashcardDetailId}/privacy/delete`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    revalidatePath(`/flashcards/discover`)
    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
