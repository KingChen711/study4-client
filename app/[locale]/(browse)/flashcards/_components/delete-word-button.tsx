"use client"

import React, { useState, useTransition } from "react"
import { Trash } from "lucide-react"
import { toast } from "sonner"

import { deleteWord } from "@/actions/flashcard/detail/delete-word"
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
  flashcardDetailId: number
}

function DeleteWordButton({ flashcardId, flashcardDetailId }: Props) {
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()

    startTransition(async () => {
      const res = await deleteWord(flashcardId, flashcardDetailId)
      if (res.isSuccess) return

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
        <Button size="icon" variant="destructive">
          <Trash className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa từ</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p>Bạn có chắc muốn xóa từ này khỏi học phần không?</p>
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

export default DeleteWordButton
