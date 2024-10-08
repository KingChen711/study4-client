"use client"

import { useEffect, useState } from "react"
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk"

import { Button } from "@/components/ui/button"

const MeetingSetup = ({
  setHasSetUpComplete,
}: {
  setHasSetUpComplete: (value: boolean) => void
}) => {
  const call = useCall()

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component.")
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false)

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable()
      call.microphone.disable()
    } else {
      call.camera.enable()
      call.microphone.enable()
    }
  }, [isMicCamToggled, call.camera, call.microphone])

  return (
    <div className="meeting-setup mt-8 flex w-full flex-col items-center justify-center gap-3">
      <h1 className="text-center text-2xl font-bold">Setup devices</h1>
      <h1 className="text-center text-lg font-medium">Room code: {call.id}</h1>

      <VideoPreview className="font-medium text-background" />

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join()

          setHasSetUpComplete(true)
        }}
      >
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
