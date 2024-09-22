"use client"

import { useAuth } from "@clerk/nextjs"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type SpeakingPart = {
  speakingPartId: number
  speakingPartNumber: number
  speakingPartDescription: string
  speakingSampleId: 1
}

export type SpeakingSample = {
  speakingSampleId: number
  speakingSampleName: string
  description: string | null
  speakingParts: SpeakingPart[]
}

type Params = {
  page: number
}

function useSpeakingSamples({ page }: Params) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["speaking-samples", { page }],
    queryFn: async () => {
      return prep4Api
        .get<{
          data: {
            users: SpeakingSample[]
            page: number
            totalPage: number
          }
        }>(`/api/speaking-samples?page=${page}&pageSize=${4}`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data.data || { page: 0, totalPage: 0, users: [] })
        .catch((_: Error) => {
          return { page: 0, totalPage: 0, users: [] }
        })
    },

    placeholderData: keepPreviousData,
  })
}

export default useSpeakingSamples
