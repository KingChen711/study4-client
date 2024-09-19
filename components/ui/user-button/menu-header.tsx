import React from "react"
import Image from "next/image"
import { type UserResource } from "@clerk/types/dist"

import { getUsernameFromEmail } from "@/lib/utils"

type Props = { user: UserResource }

function MenuHeader({ user }: Props) {
  return (
    <div className="flex min-w-fit flex-row items-center justify-start gap-3 px-6 py-3">
      <Image
        alt={user?.primaryEmailAddress?.emailAddress!}
        src={user?.imageUrl}
        width={44}
        height={44}
        className="block rounded-full"
      />
      <div className="flex flex-col gap-y-1 pr-11">
        <div className="line-clamp-1 text-sm font-medium">
          {user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : getUsernameFromEmail(user?.primaryEmailAddress?.emailAddress)}
        </div>
        <div className="line-clamp-1 text-sm text-muted-foreground">
          {user.username ||
            getUsernameFromEmail(user?.primaryEmailAddress?.emailAddress)}
        </div>
      </div>
    </div>
  )
}

export default MenuHeader
