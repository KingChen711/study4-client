import prisma from "@/lib/prisma"

export async function GET() {
  const rooms = await prisma.room.findMany({
    where: {
      quantity: 1,
      lastHeartBeat: {
        gte: Date.now() - 30 * 1000,
      },
      isPrivate: false,
    },
  })

  return Response.json(rooms)
}
