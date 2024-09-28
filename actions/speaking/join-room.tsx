"use server"

import { type ActionResponse } from "@/types"

import prisma from "@/lib/prisma"
import { getErrorResult } from "@/lib/utils"

type JoinRoomParams = {
  roomId: string
  userId: string
  band?: string
  speakingSampleId?: number
  speakingParts?: number[]
  isPrivate?: boolean
  createIfNotExist?: boolean
}

export const joinRoom = async ({
  roomId,
  userId,
  band,
  speakingParts,
  speakingSampleId,
  isPrivate,
  createIfNotExist = true,
}: JoinRoomParams): Promise<ActionResponse> => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        roomId,
      },
    })

    if (!room) {
      if (!createIfNotExist) {
        return {
          isSuccess: false,
          typeError: "base",
          messageError: "Not found room",
        }
      }

      await prisma.room.create({
        data: {
          quantity: 1,
          roomId,
          users: [userId],
          lastHeartBeat: Date.now(),
          band: band!,
          speakingSampleId: speakingSampleId!,
          speakingParts: speakingParts!,
          isPrivate: isPrivate!,
        },
      })

      return { isSuccess: true }
    }

    if (room.users.includes(userId)) {
      //*Already in the room? It's okay, return right there, no toast any error
      return { isSuccess: true }
    }

    await prisma.room.update({
      where: {
        roomId,
      },
      data: {
        quantity: room.quantity + 1,
        users: [...room.users, userId],
      },
    })

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
