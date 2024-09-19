import React from "react"
import { StreamVideoProvider } from "@/contexts/stream-client-provider"

type Props = {
  children: React.ReactNode
}

function SpeakingLayout({ children }: Props) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>
}

export default SpeakingLayout
