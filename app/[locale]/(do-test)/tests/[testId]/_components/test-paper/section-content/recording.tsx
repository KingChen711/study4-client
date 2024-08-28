import React, { useEffect, useRef } from "react"

type Props = {
  srcUrl: string | null
}

function Recording({ srcUrl }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
    }
  }, [srcUrl])

  return (
    <>
      {srcUrl && (
        <audio ref={audioRef} controls className="w-full">
          <source src={srcUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  )
}

export default Recording
