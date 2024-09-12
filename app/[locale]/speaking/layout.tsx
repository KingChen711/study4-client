import React from "react"
import SocketProvider from "@/contexts/socket-provider"
import { auth } from "@clerk/nextjs/server"

type Props = {
  children: React.ReactNode
}

function SpeakingLayout({ children }: Props) {
  auth().protect()
  const { userId } = auth()

  return (
    <SocketProvider>
      <div className="flex h-full overflow-hidden">
        {/* <SidebarSpeaking /> */}

        <div className="flex flex-1">{children}</div>
      </div>
    </SocketProvider>
  )
}

export default SpeakingLayout
