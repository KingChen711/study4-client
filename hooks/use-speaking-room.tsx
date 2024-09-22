"use client"

import { useAuth } from "@clerk/nextjs"
import { type Room } from "@prisma/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

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

function useSpeakingRoom(id: string) {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["speaking-rooms", id],
    queryFn: async () => {
      const { data: room } = await axios.get<Room | null>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/rooms/${id}`
      )

      console.log({ room })

      if (!room) return null

      const speakingSample = await prep4Api
        .get<{
          data: SpeakingSample
        }>(
          `/api/speaking-samples/${room.speakingSampleId}?${room.speakingParts.map((sp) => `speakingPartId=${sp}&`).join("")}`,
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        )
        .then((res) => res.data.data || null)
        .catch((_: Error) => {
          return null
        })

      console.log({ speakingSample })

      if (!speakingSample) return null

      return { ...room, speakingSample }
    },

    placeholderData: keepPreviousData,
  })
}

export default useSpeakingRoom
