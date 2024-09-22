"use server"

import { type ActionResponse } from "@/types"

import prisma from "@/lib/prisma"
import { getErrorResult } from "@/lib/utils"

import { initHeartBeat } from "./init-heart-beat"

type JoinRoomParams = {
  roomId: string
  userId: string
  band?: string
  speakingSampleId?: number
  speakingParts?: number[]
}

export const joinRoom = async ({
  roomId,
  userId,
  band,
  speakingParts,
  speakingSampleId,
}: JoinRoomParams): Promise<ActionResponse> => {
  try {
    const room = await prisma.room.findFirst({
      where: {
        roomId,
      },
    })

    if (!room) {
      const room = await prisma.room.create({
        data: {
          quantity: 1,
          roomId,
          users: [userId],
          lastHeartBeat: Date.now(),
          band: band!,
          speakingSampleId: speakingSampleId!,
          speakingParts: speakingParts!,
        },
      })
      await initHeartBeat(room.roomId)
      return { isSuccess: true }
    }

    if (room.users.includes(userId)) {
      return {
        isSuccess: false,
        typeError: "base",
        messageError: "You are already in the room",
      }
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
