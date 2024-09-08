"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"
import { type TMutationTestSchema } from "@/lib/validation/mutation-test"

export const createTest = async (
  body: TMutationTestSchema
): Promise<ActionResponse<TMutationTestSchema>> => {
  try {
    const { getToken } = auth()

    await prep4Api.post("/api/tests/create", body, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    revalidatePath("/staff/tests")
    revalidatePath("/tests")
    return { isSuccess: true }
  } catch (error) {
    console.log({ error })
    return getErrorResult(error)
  }
}
