"use client"

import React, { useEffect, useRef } from "react"

type Props = {
  muted: boolean
  stream: MediaStream | null
  isSearching: boolean
}

function VideoContent({ muted, stream, isSearching }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current || !stream) return
    videoRef.current.srcObject = stream
  }, [stream])

  return (
    <div className="aspect-video flex-1 rounded border">
      <video
        ref={videoRef}
        className="size-full"
        autoPlay
        playsInline
        muted={muted}
      />
    </div>
  )
}

export default VideoContent
