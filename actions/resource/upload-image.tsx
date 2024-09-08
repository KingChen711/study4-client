import "server-only"

import { type TCloudResource, type TestType } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { objectToFormData } from "@/lib/utils"

type TUploadImage = {
  testType: TestType
  testTitle: string
  testSectionName: string
  partitionNumber: string
  file: File
}

export const uploadImage = async (
  body: TUploadImage
): Promise<TCloudResource> => {
  const { getToken } = auth()

  const formData = objectToFormData(body)

  const { data } = await prep4Api.post<{ data: TCloudResource }>(
    "/api/resources/image/upload",
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
