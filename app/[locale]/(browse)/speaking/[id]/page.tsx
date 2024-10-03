"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { toast } from "sonner"

import { beatHeart } from "@/actions/speaking/init-heart-beat"
import { useGetCallById } from "@/hooks/use-get-call-by-id"
import usePremium from "@/hooks/use-premium"
import { Icons } from "@/components/ui/icons"

import MeetingRoom from "./_components/meeting-room"
import MeetingSetup from "./_components/meting-setup"

function SpeakingPageRoom() {
  const router = useRouter()
  const { id } = useParams()
  const { data: premium, isPending: loadingPremium } = usePremium()
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

  if (isCallLoading || loadingPremium)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  if (premium?.premiumPackageId !== 2 && premium?.premiumPackageId !== 3) {
    toast.error(
      "Bạn cần đăng ký gói thường hoặc gói nâng cao để sử dụng speaking room"
    )
    router.push("/premium")
    return
  }

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
