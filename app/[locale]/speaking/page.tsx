"use client"

import React, { useEffect, useState } from "react"
import { useSocket } from "@/contexts/socket-provider"
import { useUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

import VideoCall from "./_components/video-call"

function SpeakingPage() {
  const { hasConnected, handleSearchPartner, partner, status } = useSocket()
  const { isLoaded } = useUser()

  return (
    <div>
      <div>Status: {status}</div>
      <Button
        disabled={!hasConnected || !isLoaded}
        onClick={handleSearchPartner}
      >
        Search
      </Button>
      {partner && <div>Your partner is: {partner.profile.name}</div>}
      <VideoCall />
    </div>
  )
}

export default SpeakingPage
