"use client"

import React, { useTransition } from "react"
import { toast } from "sonner"

import { addToLearningList } from "@/actions/flashcard/add-to-learning-list"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  flashcardId: number
}

function AddToLearningListButton({ flashcardId }: Props) {
  const [pending, startTransition] = useTransition()

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    startTransition(async () => {
      const res = await addToLearningList(flashcardId)
      if (res.isSuccess) return
      toast.error(res.messageError)
    })
  }

  return (
    <Button disabled={pending} onClick={handleClick}>
      Thêm vào của tôi
      {pending && <Icons.Loader className="ml-1 size-4" />}
    </Button>
  )
}

export default AddToLearningListButton
