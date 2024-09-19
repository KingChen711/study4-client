"use server"

import { type ActionResponse } from "@/types"

import prisma from "@/lib/prisma"
import { getErrorResult } from "@/lib/utils"

export const findPartner = async (): Promise<
  ActionResponse<undefined, { roomId: string }>
> => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        quantity: {
          lt: 2,
        },
      },
    })

    if (!room) {
      return { isSuccess: false, typeError: "base", messageError: "Not found" }
    }

    return { isSuccess: true, data: { roomId: room.roomId } }
  } catch (error) {
    return getErrorResult(error)
  }
}
