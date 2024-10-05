"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const toggleStar = async (
  flashcardId: number,
  flashcardDetailId: number,
  isStarred: boolean
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    const res = await prep4Api.patch(
      `/api/flashcards/${flashcardId}/update-progress?userFlashcardProgressId=${flashcardDetailId}&status=${isStarred ? "STUDYING" : "STARRED"}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)
    console.log(res)

    return { isSuccess: true }
  } catch (error) {
    console.log(error)

    return getErrorResult(error)
  }
}
