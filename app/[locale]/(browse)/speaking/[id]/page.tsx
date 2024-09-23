"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"

import { beatHeart } from "@/actions/speaking/init-heart-beat"
import { useGetCallById } from "@/hooks/use-get-call-by-id"
import { Icons } from "@/components/ui/icons"

import MeetingRoom from "./_components/meeting-room"
import MeetingSetup from "./_components/meting-setup"

function SpeakingPageRoom() {
  const { id } = useParams()
  const { call, isCallLoading } = useGetCallById(id)
  const [hasSetUpComplete, setHasSetUpComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      beatHeart(id as string)
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [id])

  if (isCallLoading)
    return (
      <div className="mt-8 flex justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  if (!call)
    return <p className="mt-8 text-center text-3xl font-bold">Call Not Found</p>

  return (
    <main className="w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!hasSetUpComplete ? (
            <MeetingSetup setHasSetUpComplete={setHasSetUpComplete} />
          ) : (
            <MeetingRoom id={id as string} />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default SpeakingPageRoom