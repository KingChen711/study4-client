/* eslint-disable @typescript-eslint/no-misused-promises */
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

// Initialize heartbeat checker with roomId
export const initHeartBeat = async (roomId: string) => {
  // Wrap `checkHeartBeat` in a promise-aware interval handler
  const timer = setInterval(async () => {
    await checkHeartBeat()
  }, 10000) // 10 seconds interval

  // This function checks if the room is alive based on the last heartbeat
  async function checkHeartBeat() {
    try {
      const room = await prisma.room.findFirst({
        where: { roomId },
      })

      if (!room) {
        clearInterval(timer)
        return
      }

      const isAlive = Date.now() - room.lastHeartBeat - 30 * 1000 <= 0

      if (isAlive) {
        return
      }

      // Room is considered dead, delete it

      await prisma.room.delete({ where: { roomId } })
      clearInterval(timer)
    } catch (error) {
      console.error("Error in heartbeat check:", error)
      // Ensure interval is cleared in case of an error
      clearInterval(timer)
    }
  }
}
