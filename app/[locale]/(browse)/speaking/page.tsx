"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"

import { findPartner } from "@/actions/speaking/find-partner"
import { joinRoom } from "@/actions/speaking/join-room"
import { Button } from "@/components/ui/button"

//TODO:i18n

function SpeakingPage() {
  const router = useRouter()
  const client = useStreamVideoClient()
  const { user } = useUser()
  const [pending, startTransition] = useTransition()

  const createMeeting = async () => {
    if (!client || !user) return

    startTransition(async () => {
      try {
        const res = await findPartner()

        if (res.isSuccess) {
          const roomId = res.data.roomId
          await joinRoom({ roomId, userId: user.id })
          router.push(`/speaking/${roomId}`)
          return
        }

        const dateTime = new Date()
        const id = crypto.randomUUID()
        const call = client.call("default", id)
        if (!call) throw new Error("Failed to create meeting")
        const startsAt =
          dateTime.toISOString() || new Date(Date.now()).toISOString()

        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description: "Speaking room",
            },
          },
        })

        await joinRoom({ roomId: call.id, userId: user.id })

        router.push(`/speaking/${call.id}`)

        toast(
          "Không tìm thấy partner nào, hãy chờ đợi trong phòng meet này nhé ❤️."
        )
      } catch (error) {
        console.error(error)
        toast("Failed to create Meeting")
      }
    })
  }

  return (
    <div>
      SpeakingPage
      <Button disabled={pending} onClick={createMeeting}>
        Tìm partner
      </Button>
    </div>
  )
}

export default SpeakingPage
