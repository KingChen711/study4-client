"use client"

import React from "react"
import { useSocket } from "@/contexts/socket-provider"
import { useUser } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import VideoCall from "./_components/video-call"

function SpeakingPage() {
  const {
    readyForSearching,
    handleSearchPartner,
    handleEndCall,
    peer,
    status,
    videoDevices,
    setSelectedVideoDeviceId,
    selectedVideoDeviceId,
    localStream,
  } = useSocket()
  // const { isLoaded } = useUser()

  const handleChangeCamera = (deviceId: string) => {
    setSelectedVideoDeviceId(deviceId)
    // if (!localStream) return
    // const videoTracks = localStream.getVideoTracks()

    // console.log({ videoTracks })

    // const index = videoTracks.findIndex((d) => d.id === deviceId)

    // console.log({ index })

    // if (index !== -1 && index !== 0) {
    //   // Ensure the element is found and isn't the first element already
    //   // Swap the elements
    //   ;[videoTracks[0], videoTracks[index]] = [
    //     videoTracks[index],
    //     videoTracks[0],
    //   ]
    // }
  }

  return (
    <div>
      <div>Status: {status}</div>
      <Button disabled={!readyForSearching} onClick={handleSearchPartner}>
        Search
      </Button>
      <Button
        variant="outline"
        disabled={status === "idle"}
        onClick={handleEndCall}
      >
        End call
      </Button>
      {peer && <div>Your partner is: {peer.partner.profile.name}</div>}
      <VideoCall />

      <div>
        <h2 className="text-lg font-bold">Video devices</h2>
        <ul className="flex flex-col gap-y-2">
          {videoDevices.map((vd) => (
            <li
              onClick={() => handleChangeCamera(vd.deviceId)}
              key={vd.deviceId}
              className={cn(
                vd.deviceId === selectedVideoDeviceId && "text-primary"
              )}
            >
              {vd.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SpeakingPage
