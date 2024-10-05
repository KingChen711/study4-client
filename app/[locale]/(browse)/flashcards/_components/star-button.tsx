"use client"

import React, { useTransition } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { toggleStar } from "@/actions/flashcard/detail/toggle-star"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  isStarred: boolean
  flashcardDetailId: number
  flashcardId: number
}

function StarButton({ isStarred, flashcardDetailId, flashcardId }: Props) {
  const [pending, startTransition] = useTransition()

  const handleToggleStar = () => {
    if (pending) return

    startTransition(async () => {
      const res = await toggleStar(flashcardId, flashcardDetailId, isStarred)
      if (res.isSuccess) return
      toast.error(res.messageError)
    })
  }

  return (
    <Button
      disabled={pending}
      onClick={handleToggleStar}
      size="icon"
      variant="ghost"
    >
      <Icons.Star
        className={cn("size-7", isStarred ? "text-star" : "text-neutral-300")}
      />
    </Button>
  )
}

export default StarButton
