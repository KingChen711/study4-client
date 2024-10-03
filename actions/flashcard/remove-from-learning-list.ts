"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const removeFromLearningList = async (
  flashcardId: number
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.delete(`/api/flashcards/${flashcardId}/privacy/delete`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    revalidatePath(`/flashcards/discover`)
    revalidatePath(`/flashcards/list/${flashcardId}`)
    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)
    revalidatePath(`/flashcards/learning`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
