"use server"

import prisma from "@/lib/prisma"

// Update last heartbeat for a room
export const beatHeart = async (roomId: string) => {
  try {
    await prisma.room.update({
      where: { roomId },
      data: {
        lastHeartBeat: Date.now(),
      },
    })
  } catch (error) {
    console.error("Error updating heartbeat:", error)
  }
}
