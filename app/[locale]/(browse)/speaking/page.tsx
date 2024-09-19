"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useStreamVideoClient } from "@stream-io/video-react-sdk"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

function SpeakingPage() {
  const router = useRouter()
  const client = useStreamVideoClient()
  const { user } = useUser()
  const [pending, startTransition] = useTransition()

  const createMeeting = async () => {
    if (!client || !user) return

    startTransition(async () => {
      try {
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
        router.push(`/speaking/${call.id}`)

        toast("Meeting Created")
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
        Join room
      </Button>
    </div>
  )
}

export default SpeakingPage
