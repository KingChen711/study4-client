"use server"

import { type ActionResponse } from "@/types"
import { type Prisma } from "@prisma/client"

import prisma from "@/lib/prisma"
import { getErrorResult } from "@/lib/utils"

export const findPartner = async (
  band: string
): Promise<ActionResponse<undefined, { roomId: string }>> => {
  const AND: Prisma.RoomWhereInput[] = [
    {
      quantity: 1,
    },
    {
      lastHeartBeat: {
        gte: Date.now() - 30 * 1000,
      },
    },
    {
      isPrivate: false, //find public room
    },
  ]

  if (band !== "All") {
    AND.push({
      band,
    })
  }

  try {
    const room = await prisma.room.findFirst({
      where: { AND },
    })

    if (!room) {
      return {
        isSuccess: false,
        typeError: "base",
        messageError: "NotFoundRoom",
      }
    }

    return { isSuccess: true, data: { roomId: room.roomId } }
  } catch (error) {
    return getErrorResult(error)
  }
}
