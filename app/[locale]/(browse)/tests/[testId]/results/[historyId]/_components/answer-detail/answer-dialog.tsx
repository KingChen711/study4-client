import React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  partitionId: number
  gradeId: number
}

function AnswerDialog({ gradeId, partitionId }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-primary hover:underline">
          [Chi tiết]
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AnswerDialog
