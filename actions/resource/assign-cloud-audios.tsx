//this run on client

import { type TCloudResource } from "@/types"
import { type z } from "zod"

import prep4Api from "@/lib/prep4-api"
import { type testSectionSchema } from "@/lib/validation/mutation-test"

type TAssignCloudAudio = {
  testSections: z.infer<typeof testSectionSchema>[]
  testTitle: string
  token: string
}

export const assignCloudAudios = async ({
  testSections,
  testTitle,
  token,
}: TAssignCloudAudio) => {
  const audioCloudResources = await Promise.all(
    testSections.map(async (ts) => {
      if (!ts.audioFile) return undefined

      const formData = new FormData()
      formData.append("testType", "Listening")
      formData.append("testTitle", testTitle)
      formData.append("testSectionName", ts.testSectionName!)
      formData.append("file", ts.audioFile as File)

      const { data } = await prep4Api.post<{ data: TCloudResource }>(
        "/api/resources/audio/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return data.data
    })
  )

  return testSections.map((ts, i) => {
    ts.cloudResource = audioCloudResources[i]
    ts.audioUrl = undefined
    ts.audioFile = undefined
    return ts
  })
}
