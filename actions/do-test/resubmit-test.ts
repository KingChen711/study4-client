"use server"

import { revalidatePath } from "next/cache"
import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import whoAmI from "@/queries/users/who-am-i"
import { type ActionResponse } from "@/types"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"
import { type TResubmitTestSchema } from "@/lib/validation/do-test"

export const resubmitTest = async (
  body: TResubmitTestSchema
): Promise<ActionResponse> => {
  try {
    const currentUser = await whoAmI()

    if (!currentUser) throw Error(UNKNOWN_ERROR_MESSAGE)

    await prep4Api.put(`/api/tests/${body.testId}/re-submit`, body)

    revalidatePath(`/tests/${body.testId}`)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
