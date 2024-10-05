"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"
import { toast } from "sonner"

import { removeFromLearningList } from "@/actions/flashcard/remove-from-learning-list"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  const [open, setOpen] = useState(false)
  const router = useRouter()

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    startTransition(async () => {
      const res = await removeFromLearningList(flashcardId)
      if (res.isSuccess) {
        if (redirectToPublic) {
          router.push(`/flashcards/list/${flashcardId}`)
        } else {
          router.push(`/flashcards`)
        }
        return
      }
      toast.error(res.messageError)
    })
  }

  const handleOpenChange = (value: boolean) => {
    if (pending) return
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa học phần?</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>
                Học phần này sẽ xóa khỏi danh sách các học phần của bạn sau khi
                bạn bấm xác nhận.
              </p>
              <div className="flex justify-end gap-x-4">
                <DialogClose asChild>
                  <Button
                    disabled={pending}
                    variant="secondary"
                    className="float-right"
                  >
                    Hủy
                  </Button>
                </DialogClose>

                <Button
                  onClick={handleClick}
                  disabled={pending}
                  variant="destructive"
                  type="submit"
                  className="float-right"
                >
                  Xác nhận {pending && <Icons.Loader className="ml-1 size-4" />}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default RemoveFromLearningListButton
