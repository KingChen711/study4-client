"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const addToLearningList = async (
  flashcardId: number
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.post(
      `/api/flashcards/${flashcardId}/add-user`,
      {},
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    revalidatePath(`/flashcards/discover`)
    revalidatePath(`/flashcards/learning`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
