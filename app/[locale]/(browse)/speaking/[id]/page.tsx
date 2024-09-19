import React from "react"

type Props = {
  params: {
    id: string
  }
}

function SpeakingPageRoom({ params: { id } }: Props) {
  return <div>SpeakingPageRoom: #{id}</div>
}

export default SpeakingPageRoom
