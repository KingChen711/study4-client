"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { toast } from "sonner"

import { removeFromLearningList } from "@/actions/flashcard/remove-from-learning-list"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  flashcardId: number
  redirectToPublic?: boolean
}

function RemoveFromLearningListButton({
  flashcardId,
  redirectToPublic = false,
}: Props) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    startTransition(async () => {
      const res = await removeFromLearningList(flashcardId)
      if (res.isSuccess) {
        console.log("wtf")
        if (redirectToPublic) {
          router.push(`/flashcards/list/${flashcardId}`)
        }
        return
      }
      toast.error(res.messageError)
    })
  }

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? (
        <Icons.Loader className="size-4" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  )
}

export default RemoveFromLearningListButton
