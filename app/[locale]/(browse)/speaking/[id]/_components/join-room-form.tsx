"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { joinRoom } from "@/actions/speaking/join-room"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

function JoinRoomForm() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState<string>("")
  const t = useTranslations("SpeakingPage")
  const { user } = useUser()
  const [pending, startTransition] = useTransition()

  const handleJoinRoom = async () => {
    if (!roomCode || !user || pending) return

    startTransition(async () => {
      const res = await joinRoom({
        roomId: roomCode,
        userId: user.id,
      })

      if (res.isSuccess) {
        router.push(`/speaking/${roomCode}`)
        return
      }

      toast.error(res.messageError)
    })
  }

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <div className="flex items-center">
        <div className="flex h-full items-center rounded-md border px-4">
          <Icons.Keyboard className="mr-2 size-6" />
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="h-full border-none bg-transparent py-0 outline-none"
            placeholder={t("EnterRoomCode")}
          />
        </div>
        <Button
          className="text-base"
          onClick={handleJoinRoom}
          disabled={!roomCode || pending}
          variant="link"
        >
          {t("Join")}
          {pending && <Icons.Loader className="ml-1 size-4" />}
        </Button>
      </div>
    </div>
  )
}

export default JoinRoomForm
