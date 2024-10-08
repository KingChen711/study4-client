"use server"

import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const changeFlashcardStatus = async (
  flashcardId: number,
  flashcardDetailId: number,
  status: "STUDYING" | "PROFICIENT" | "STARRED"
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.patch(
      `/api/flashcards/${flashcardId}/update-progress?userFlashcardProgressId=${flashcardDetailId}&status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    // revalidatePath(`/flashcards/list/${flashcardId}/privacy`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
