"use server"

import { revalidatePath } from "next/cache"
import { type ActionResponse, type TCloudResource } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { v4 as uuidv4 } from "uuid"

import prep4Api from "@/lib/prep4-api"
import { audioBlogUrlToFile, getErrorResult } from "@/lib/utils"
import { type TMutationTestSchema } from "@/lib/validation/mutation-test"

import { uploadAudio } from "../resource/upload-audio"

export const createTest = async (
  body: TMutationTestSchema
): Promise<ActionResponse<TMutationTestSchema>> => {
  try {
    const { getToken } = auth()

    const audioCloudResourcesData = body.testSections
      .map((ts) =>
        ts.audioResource
          ? {
              audioBase64: ts.audioResource,
              testSectionName: ts.testSectionName!,
              testTitle: body.testTitle,
            }
          : undefined
      )
      .map(async (audioBlogUrlItem) => {
        if (!audioBlogUrlItem) return undefined

        const cloudResource = await uploadAudio({
          file: audioBlogUrlItem.audioBase64,
          testSectionName: audioBlogUrlItem.testSectionName,
          testTitle: audioBlogUrlItem.testTitle,
          testType: "Listening",
        })
        return cloudResource
      })

    const audioCloudResources = await Promise.all(audioCloudResourcesData)

    body.testSections.forEach((ts, i) => {
      if (!ts.audioResource) return

      ts.audioResource = undefined
      ts.cloudResource = audioCloudResources[i]!
    })

    console.log({ body })

    // await prep4Api.post("/api/tests/create", body, {
    //   headers: {
    //     Authorization: `Bearer ${await getToken()}`,
    //   },
    // })

    return { isSuccess: true }
  } catch (error) {
    console.log(error)

    return getErrorResult(error)
  }
}
