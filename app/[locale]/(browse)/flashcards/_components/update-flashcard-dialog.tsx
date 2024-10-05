"use client"

import React, { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  createFlashcardSchema,
  type TCreateFlashcardSchema,
} from "@/lib/validation/flashcard"
import { updateFlashcard } from "@/actions/flashcard/update-flashcard"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Props = {
  flashcardId: number
  title: string
  description: string | null
}

function UpdateFlashcardDialog({ description, title, flashcardId }: Props) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  const form = useForm<TCreateFlashcardSchema>({
    resolver: zodResolver(createFlashcardSchema),
    defaultValues: { title, description: description || "" },
  })

  const handleOpenChange = (value: boolean) => {
    if (pending) return
    setOpen(value)
  }

  const onSubmit = async (values: TCreateFlashcardSchema) => {
    startTransition(async () => {
      const res = await updateFlashcard(flashcardId, values)
      setOpen(false)
      if (res.isSuccess) return
      toast.error(res.messageError)
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="size-4" />
          <span className="sr-only">Edit topic</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <p className="mb-2">Chỉnh sửa học phần</p>
          </DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Tiêu đề</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Input
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base"
                            placeholder="Tiêu đề..."
                            disabled={pending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Mô tả</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Textarea
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base"
                            placeholder="Mô tả..."
                            disabled={pending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-x-4">
                  <DialogClose asChild>
                    <Button
                      disabled={pending}
                      variant="secondary"
                      className="float-right mt-4"
                    >
                      Hủy
                    </Button>
                  </DialogClose>

                  <Button
                    disabled={pending}
                    type="submit"
                    className="float-right mt-4"
                  >
                    Cập nhật{" "}
                    {pending && <Icons.Loader className="ml-1 size-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateFlashcardDialog
