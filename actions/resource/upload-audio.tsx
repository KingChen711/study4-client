import "server-only"

import { type TCloudResource, type TestType } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { objectToFormData } from "@/lib/utils"

type TUploadAudio = {
  testType: TestType
  testTitle: string
  testSectionName: string
  file: string
}

export const uploadAudio = async (
  body: TUploadAudio
): Promise<TCloudResource> => {
  const { getToken } = auth()

  const formData = objectToFormData(body)

  const { data } = await prep4Api.post<{ data: TCloudResource }>(
    "/api/resources/audio/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  )

  return data.data
}
