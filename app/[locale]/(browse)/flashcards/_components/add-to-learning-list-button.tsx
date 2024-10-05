"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { addToLearningList } from "@/actions/flashcard/add-to-learning-list"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  type: "add-to-my-list" | "practice" | "on-card"
  flashcardId: number
}

function AddToLearningListButton({ type, flashcardId }: Props) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleClick(
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    if (pending) return

    startTransition(async () => {
      const res = await addToLearningList(flashcardId)
      if (res.isSuccess) {
        if (type === "add-to-my-list") {
          router.push(`/flashcards/list/${flashcardId}/privacy`)
        } else if (type === "practice") {
          router.push(`/flashcards/list/${flashcardId}/privacy/full-screen`)
        }
        return
      }
      toast.error(res.messageError)
    })
  }

  return (
    <>
      {type === "on-card" ? (
        <Button disabled={pending} onClick={handleClick}>
          Thêm vào của tôi
          {pending && <Icons.Loader className="ml-1 size-4" />}
        </Button>
      ) : (
        <div
          onClick={handleClick}
          className={cn(
            "col-span-12 flex cursor-pointer select-none flex-col items-center justify-between gap-y-2 rounded-xl border-2 border-b-4 border-primary bg-primary/10 p-4 text-sm font-bold uppercase active:border-b-2 sm:col-span-6 lg:col-span-3",
            pending && "pointer-events-none opacity-70"
          )}
        >
          {pending ? (
            <Icons.Loader className="size-8 text-primary" />
          ) : (
            <Icons.Save className="size-8 text-primary" />
          )}
          {type === "add-to-my-list" ? "Thêm vào của tôi" : "Luyện tập"}
        </div>
      )}
    </>
  )
}

export default AddToLearningListButton
