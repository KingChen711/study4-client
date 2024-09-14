"use client"

import React, { useState } from "react"
import { useSocket } from "@/contexts/socket-provider"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import VideoContent from "./video-content"

function VideoCall() {
  const { localStream, peer } = useSocket()
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVidOn, setIsVidOn] = useState(true)

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0]
      videoTrack.enabled = !videoTrack.enabled
      setIsVidOn(videoTrack.enabled)
    }
  }

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      audioTrack.enabled = !audioTrack.enabled
      setIsMicOn(audioTrack.enabled)
    }
  }

  return (
    <div>
      <div className="flex w-full gap-8">
        {localStream && (
          <VideoContent muted stream={localStream} isSearching={false} />
        )}
        {peer && (
          <VideoContent
            stream={peer.stream || null}
            muted={false}
            isSearching={false}
          />
        )}
      </div>

      <Button
        onClick={toggleMic}
        variant={isMicOn ? "secondary" : "destructive"}
        size="icon"
      >
        {isMicOn ? (
          <Icons.MicOn className="size-4" />
        ) : (
          <Icons.MicOff className="size-4" />
        )}
      </Button>

      <Button
        onClick={toggleCamera}
        variant={isVidOn ? "secondary" : "destructive"}
        size="icon"
      >
        {isVidOn ? (
          <Icons.CameraOn className="size-4" />
        ) : (
          <Icons.CameraOff className="size-4" />
        )}
      </Button>
    </div>
  )
}

export default VideoCall
