"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk"

import { getUsernameFromEmail } from "@/lib/utils"
import { tokenProvider } from "@/actions/stream/token-provider"
import { Icons } from "@/components/ui/icons"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!

export const StreamVideoProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const { user, isLoaded } = useUser()

  useEffect(() => {
    if (!isLoaded || !user) return

    if (!apiKey) throw new Error("Missing stream api key.")

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name:
          user.username ||
          getUsernameFromEmail(user.primaryEmailAddress?.emailAddress) ||
          user?.id,
        image: user.imageUrl,
      },
      tokenProvider,
    })

    setVideoClient(client)
  }, [isLoaded, user])

  if (!videoClient)
    return (
      <div className="mt-8 flex w-full justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
