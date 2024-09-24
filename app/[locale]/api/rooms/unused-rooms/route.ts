import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic" // static by default, unless reading the request

export async function GET(_: Request) {
  await prisma.room.deleteMany({
    where: {
      lastHeartBeat: {
        lt: Date.now() - 30 * 1000,
      },
    },
  })

  return new Response(`Delete unused room`)
}
