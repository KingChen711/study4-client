import React from "react"
import Image from "next/image"
import { type UserResource } from "@clerk/types/dist"

type Props = {
  user: UserResource
  open: boolean
  setOpen: (value: boolean) => void
}

function TriggerAvatar({ open, setOpen, user }: Props) {
  return (
    <button className="outline-none" onClick={() => setOpen(!open)}>
      <Image
        alt={user?.primaryEmailAddress?.emailAddress!}
        src={user?.imageUrl}
        width={30}
        height={30}
        className="rounded-full"
      />
    </button>
  )
}

export default TriggerAvatar
