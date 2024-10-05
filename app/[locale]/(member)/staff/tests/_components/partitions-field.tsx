import React from "react"
import Image from "next/image"
import { editorPlugin } from "@/constants"
import { type PartitionTag } from "@/queries/test/create-test-items/get-create-test-items"
import { type TestType } from "@/types"
import { Editor } from "@tinymce/tinymce-react"
import { CheckIcon, Plus, Trash, UploadIcon } from "lucide-react"
import { useFieldArray, type Control, type FieldErrors } from "react-hook-form"

import { cn } from "@/lib/utils"
import { type TMutationTestSchema } from "@/lib/validation/mutation-test"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import QuestionsField from "./questions-field"
import { testTypeToSectionPrefix } from "./sections-field"
import {
  type THandleChangeCorrectOption,
  type THandleChangeImagePartition,
} from "./test-form"

type Props = {
  control: Control<TMutationTestSchema>
  disabled: boolean
  sectionIndex: number
  partitionTagItems: PartitionTag[]
  testType: TestType
  errors: FieldErrors<TMutationTestSchema>
  onChangeCorrectOption: (params: THandleChangeCorrectOption) => void
  onChangeImagePartition: (params: THandleChangeImagePartition) => void
}

function PartitionsField({
  control,
  disabled,
  sectionIndex,
  partitionTagItems,
  testType,
  errors,
  onChangeCorrectOption,
  onChangeImagePartition,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: `testSections.${sectionIndex}.testSectionPartitions`,
    control,
  })

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
    partitionIndex: number
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (!file.type.includes("image")) return

      onChangeImagePartition({
        file,
        sectionIndex,
        partitionIndex,
      })

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className="rounded-xl border-2 border-warning py-4">
          <div className="flex items-center justify-between border-b-2 border-warning px-4 pb-2">
            <div className="flex items-center gap-x-3">
              <label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {`${testTypeToSectionPrefix[testType]} ${sectionIndex + 1} > Partition ${index + 1}`}
              </label>
            </div>
            <Button
              disabled={fields.length <= 1 || disabled}
              onClick={() => {
                if (fields.length <= 1) return
                remove(index)
              }}
              variant="ghost"
              size="icon"
            >
              <Trash className="size-5 text-danger" />
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 p-4">
            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${index}.partitionTagId`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Partition tag
                    <span className="text-lg font-bold leading-none text-primary">
                      *
                    </span>
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={disabled}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[400px] max-w-full justify-between border-border bg-transparent",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? partitionTagItems.find(
                                (partitionTag) =>
                                  partitionTag.partitionTagId === field.value
                              )?.partitionTagDesc
                            : "Select partition tag"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] max-w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search partition tag..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No partition tag found.</CommandEmpty>
                          <CommandGroup>
                            {partitionTagItems.map((partitionTag) => (
                              <CommandItem
                                key={partitionTag.partitionTagId}
                                onSelect={() =>
                                  field.onChange(partitionTag.partitionTagId)
                                }
                              >
                                {partitionTag.partitionTagDesc}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto size-4",
                                    partitionTag.partitionTagId === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${index}.partitionDesc`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Partition description
                    <span className="text-lg font-bold leading-none text-primary">
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Editor
                      disabled={disabled}
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      init={{
                        ...editorPlugin,
                      }}
                      onEditorChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${index}.imageUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Image resource
                    {field.value ? (
                      <div
                        className={cn(
                          "group relative mt-2 flex size-64 items-center justify-center rounded-md border-2",
                          disabled && "pointer-events-none opacity-80"
                        )}
                      >
                        <Image
                          src={field.value}
                          alt="imageUrl"
                          width={240}
                          height={240}
                          className="rounded-md object-contain group-hover:opacity-55"
                        />

                        {/* <Button
                          disabled={disabled}
                          onClick={(e) => {
                            e.preventDefault()
                            field.onChange("")
                          }}
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 hidden group-hover:inline-flex"
                        >
                          <Trash2Icon className="size-6 text-danger" />
                        </Button> */}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "mt-2 flex size-64 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md border-[3px] border-dashed",
                          disabled && "pointer-events-none opacity-80"
                        )}
                      >
                        <UploadIcon className="size-12" />
                        <p>Upload</p>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      type="file"
                      accept="image/*"
                      placeholder="Add profile photo"
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(e, field.onChange, index)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <QuestionsField
              testType={testType}
              control={control}
              disabled={disabled}
              sectionIndex={sectionIndex}
              partitionIndex={index}
              errors={errors}
              onChangeCorrectOption={onChangeCorrectOption}
            />
          </div>
        </div>
      ))}
      <div
        onClick={() => {
          append({
            partitionDesc: "",
            questions: [],
          })
        }}
        className={cn(
          "group flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-8 font-bold",
          disabled && "pointer-events-none"
        )}
      >
        <Plus className="mr-1 size-5 font-extrabold group-hover:text-warning" />
        <p className="group-hover:text-warning">MORE PARTITION</p>
      </div>
    </>
  )
}

export default PartitionsField
