"use client"

import React, { useState } from "react"
import { useSocket } from "@/contexts/socket-provider"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import VideoContent from "./video-content"

function VideoCall() {
  const {
    localStream,
    audioInputDevices,
    audioOutputDevices,
    videoInputDevices,
  } = useSocket()
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
      {localStream && (
        <VideoContent muted stream={localStream} isSearching={false} />
      )}

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

      <div>
        <h2 className="text-lg font-bold">Audio Input Devices</h2>
        <ul>
          {audioInputDevices.map((device) => (
            <li key={device.deviceId}>
              {device.label || `Microphone (${device.deviceId})`}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-bold">Audio Output Devices</h2>
        <ul>
          {audioOutputDevices.map((device) => (
            <li key={device.deviceId}>
              {device.label || `Speaker (${device.deviceId})`}
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold">Video Input Devices</h2>
        <ul>
          {videoInputDevices.map((device) => (
            <li key={device.deviceId}>
              {device.label || `Camera (${device.deviceId})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default VideoCall
