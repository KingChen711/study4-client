"use client"

import { type Room } from "@prisma/client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"

function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data: rooms } = await axios.get<Room[]>(`/api/rooms`)
      return rooms
    },
    placeholderData: keepPreviousData,
  })
}

export default useRooms
