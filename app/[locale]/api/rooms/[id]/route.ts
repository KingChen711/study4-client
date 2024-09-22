import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const room = await prisma.room.findFirst({
    where: {
      roomId: params.id,
    },
  })

  return Response.json(room)
}
