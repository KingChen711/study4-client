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
      quantity: {
        lt: 2,
      },
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
