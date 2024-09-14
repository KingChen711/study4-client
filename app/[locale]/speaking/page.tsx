"use client"

import React from "react"
import { useSocket } from "@/contexts/socket-provider"
import { useUser } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

import VideoCall from "./_components/video-call"

function SpeakingPage() {
  const { readyForSearching, handleSearchPartner, peer, status } = useSocket()
  const { isLoaded } = useUser()

  return (
    <div>
      <div>Status: {status}</div>
      <Button disabled={!readyForSearching} onClick={handleSearchPartner}>
        Search
      </Button>
      {peer && <div>Your partner is: {peer.partner.profile.name}</div>}
      <VideoCall />
    </div>
  )
}

export default SpeakingPage
