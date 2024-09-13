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
    <video
      ref={videoRef}
      className="w-full max-w-[800px] flex-1 rounded border"
      autoPlay
      playsInline
      muted={muted}
    />
  )
}

export default VideoContent
