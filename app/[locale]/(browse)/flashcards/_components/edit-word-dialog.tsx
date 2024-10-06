"use client"

import React, { useState, useTransition } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, UploadIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  updateWordSchema,
  type TUpdateWordSchema,
} from "@/lib/validation/flashcard"
import { updateWord } from "@/actions/flashcard/detail/update-word"
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
  flashcardDetailId: number
  wordText: string
  definition: string
  wordForm: string
  wordPronunciation?: string
  example?: string
  imageUri?: string
}

function EditWordDialog({
  flashcardId,
  flashcardDetailId,
  definition,
  wordForm,
  wordText,
  example,
  imageUri,
  wordPronunciation,
}: Props) {
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  const form = useForm<TUpdateWordSchema>({
    resolver: zodResolver(updateWordSchema),
    defaultValues: {
      flashcardId,
      wordText,
      definition,
      wordForm,
      wordPronunciation,
      example,
      imageUri,
      flashcardDetailId,
    },
  })

  const handleOpenChange = (value: boolean) => {
    if (pending) return
    setOpen(value)
  }

  const onSubmit = async (values: TUpdateWordSchema) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append("wordText", values.wordText)
      formData.append("definition", values.definition)
      formData.append("wordForm", values.wordForm)
      formData.append("flashcardId", flashcardId.toString())
      if (values.wordPronunciation) {
        formData.append("wordPronunciation", values.wordPronunciation)
      }
      if (values.example) {
        formData.append("example", values.example)
      }
      if (values.image) {
        formData.append("image", values.image)
      }

      const res = await updateWord(formData)
      setOpen(false)
      if (res.isSuccess) return
      toast.error(res.messageError)
    })
  }

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file.type.includes("image")) return

      form.setValue("image", file)

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="px-1 pt-1">Chỉnh sửa flashcard</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 max-h-[70dvh] space-y-4 overflow-y-auto px-1"
              >
                <FormField
                  control={form.control}
                  name="wordText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Từ
                        <span className="text-lg font-bold leading-none text-primary">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Input
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base text-foreground"
                            placeholder="Từ..."
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
                  name="definition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Định nghĩa
                        <span className="text-lg font-bold leading-none text-primary">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Textarea
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base text-foreground"
                            placeholder="Định nghĩa..."
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
                  name="wordForm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Loại từ
                        <span className="text-lg font-bold leading-none text-primary">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Input
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base text-foreground"
                            placeholder="Loại từ..."
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
                  name="wordPronunciation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Phiên âm</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Input
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base text-foreground"
                            placeholder="Phiên âm..."
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
                  name="example"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Ví dụ</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-y-4">
                          <Textarea
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="text-base text-foreground"
                            placeholder="Ví dụ..."
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
                  name="imageUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Ảnh minh họa
                        {field.value ? (
                          <div
                            className={cn(
                              "group relative mt-2 flex size-64 items-center justify-center rounded-md border-2",
                              pending && "pointer-events-none opacity-80"
                            )}
                          >
                            <Image
                              src={field.value}
                              alt="imageUrl"
                              width={240}
                              height={240}
                              className="rounded-md object-contain group-hover:opacity-55"
                            />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "mt-2 flex size-64 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md border-[3px] border-dashed",
                              pending && "pointer-events-none opacity-80"
                            )}
                          >
                            <UploadIcon className="size-12" />
                            <p>Upload</p>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          type="file"
                          accept="image/*"
                          placeholder="Edit profile photo"
                          className="hidden text-foreground"
                          onChange={(e) => handleImageChange(e, field.onChange)}
                        />
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

export default EditWordDialog