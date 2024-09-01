"use server"

import { revalidatePath } from "next/cache"
import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import whoAmI from "@/queries/users/who-am-i"
import { type ActionResponse } from "@/types"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"
import { type TSubmitTestSchema } from "@/lib/validation/do-test"

export const submitTest = async (
  body: TSubmitTestSchema
): Promise<ActionResponse> => {
  try {
    const currentUser = await whoAmI()

    if (!currentUser) throw Error(UNKNOWN_ERROR_MESSAGE)

    await prep4Api.post("/api/tests/submission", {
      ...body,
      userId: currentUser.userId,
      totalCompletionTime: body.totalCompletionTime.toString(),
    })

    revalidatePath(`/tests/${body.testId}`)

    return { isSuccess: true }
  } catch (error) {
    console.log(error)

    return getErrorResult(error)
  }
}
