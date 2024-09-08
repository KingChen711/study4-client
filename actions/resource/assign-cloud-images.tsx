//this run on client

import { type TCloudResource, type TestType } from "@/types"
import { type z } from "zod"

import prep4Api from "@/lib/prep4-api"
import { type testSectionSchema } from "@/lib/validation/mutation-test"

type TAssignCloudImage = {
  testSections: z.infer<typeof testSectionSchema>[]
  testTitle: string
  token: string
  testType: TestType
}

export const assignCloudImages = async ({
  testSections,
  testTitle,
  token,
  testType,
}: TAssignCloudImage) => {
  const imageCloudResources = await Promise.all(
    testSections.map(async (ts) => {
      return await Promise.all(
        ts.testSectionPartitions.map(async (sp, partitionIndex) => {
          if (!sp.imageFile) return undefined

          const formData = new FormData()
          formData.append("testType", testType)
          formData.append("testTitle", testTitle)
          formData.append("testSectionName", ts.testSectionName!)
          formData.append("partitionNumber", (partitionIndex + 1).toString())
          formData.append("file", sp.imageFile as File)

          const { data } = await prep4Api.post<{ data: TCloudResource }>(
            "/api/resources/image/upload",
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
    })
  )

  return testSections.map((ts, sectionIndex) => {
    ts.testSectionPartitions = ts.testSectionPartitions.map(
      (sp, partitionIndex) => {
        sp.imageFile = undefined
        sp.imageUrl = undefined
        sp.cloudResource = imageCloudResources[sectionIndex][partitionIndex]

        return sp
      }
    )

    return ts
  })
}
