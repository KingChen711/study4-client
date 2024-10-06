"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const createWord = async (
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const { getToken } = auth()

    await prep4Api.post("/api/flashcard-details/privacy/create", formData, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    })

    const flashcardId = formData.get("flashcardId")?.toString()
    revalidatePath(`/flashcards/list/${flashcardId}/privacy`)
    revalidatePath(`/flashcards`)
    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
