"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const updateWord = async (
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    const flashcardDetailId = formData.get("flashcardDetailId")?.toString()
    const flashcardId = formData.get("flashcardId")?.toString()

    await prep4Api.put(
      `/api/flashcard-details/${flashcardDetailId}/privacy/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)
    revalidatePath(`/flashcards`)
    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
