import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type Props = {
  srcUrl: string | null
  className?: string
}

function Recording({ srcUrl, className }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [srcUrl])

  return (
    <>
      {srcUrl && (
        <div className="rounded-2xl bg-card p-3">
          <audio ref={audioRef} controls className={cn("w-full", className)}>
            <source src={srcUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  )
}

export default Recording
