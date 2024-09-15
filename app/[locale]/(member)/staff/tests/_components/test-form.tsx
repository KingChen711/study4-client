"use client"

import React, { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import {
  type PartitionTag,
  type Tag,
  type TestCategory,
} from "@/queries/test/create-test-items/get-create-test-items"
import { type TestType } from "@/types"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
  createSection,
  mutationTestSchema,
  type TMutationTestSchema,
} from "@/lib/validation/mutation-test"
import { assignCloudAudios } from "@/actions/resource/assign-cloud-audios"
import { assignCloudImages } from "@/actions/resource/assign-cloud-images"
import { createTest } from "@/actions/test/create-test"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import TagBadges from "@/components/badges/tag-badge"

import SectionFields from "./sections-field"

type Props = {
  categoryItems: TestCategory[]
  partitionTagItems: PartitionTag[]
  tagItems: Tag[]
  type: "create" | "update"
}

export type THandleChangeCorrectOption = {
  sectionIndex: number
  partitionIndex: number
  questionIndex: number
  questionAnswerIndex: number
}

export type THandleChangeAudioSection = {
  sectionIndex: number
  file: File
}

export type THandleChangeImagePartition = {
  sectionIndex: number
  partitionIndex: number
  file: File
}

function TestForm({ type, categoryItems, tagItems, partitionTagItems }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { getToken } = useAuth()

  const form = useForm<TMutationTestSchema>({
    resolver: zodResolver(mutationTestSchema),
    defaultValues: {
      testTitle: "",
      testType: "Listening",
      totalQuestion: 0,
      totalSection: 1,
      tags: [],
      testSections: [createSection({ testType: "Listening" })],
    },
  })

  const onSubmit = async (values: TMutationTestSchema) => {
    startTransition(async () => {
      const token = await getToken()

      if (!token) throw new Error("Forbidden")

      try {
        values.testSections = await assignCloudAudios({
          testSections: values.testSections,
          testTitle: values.testTitle,
          token,
        })

        values.testSections = await assignCloudImages({
          testSections: values.testSections,
          testTitle: values.testTitle,
          testType: values.testType,
          token,
        })

        const res = await createTest(values)
        if (res.isSuccess) {
          router.push("/staff/tests")
          return
        }

        toast.error(UNKNOWN_ERROR_MESSAGE)
      } catch (error) {
        toast.error(UNKNOWN_ERROR_MESSAGE)
      }
    })
  }

  const handleClickDeleteTestTag = (tagId: number) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((t) => t !== tagId)
    )
  }

  const handleChangeAudioSection = ({
    file,
    sectionIndex,
  }: THandleChangeAudioSection) => {
    form.setValue(`testSections.${sectionIndex}.audioFile`, file)
  }

  const handleChangeImagePartition = ({
    file,
    sectionIndex,
    partitionIndex,
  }: THandleChangeImagePartition) => {
    form.setValue(
      `testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.imageFile`,
      file
    )
  }

  const handleChangeCorrectOption = ({
    sectionIndex,
    partitionIndex,
    questionIndex,
    questionAnswerIndex,
  }: THandleChangeCorrectOption) => {
    const questionAnswersCount = form.getValues(
      `testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers`
    ).length

    for (let i = 0; i < questionAnswersCount; ++i) {
      form.setValue(
        `testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers.${i}.isTrue`,
        questionAnswerIndex === i
      )
    }
  }

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="testTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Test title
                <span className="text-lg font-bold leading-none text-primary">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={pending}
                  placeholder="Example: Listening Test 999..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Duration (minutes)
                <span className="text-lg font-bold leading-none text-primary">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={pending}
                  placeholder="Example: 40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Test type
                <span className="text-lg font-bold leading-none text-primary">
                  *
                </span>
              </FormLabel>
              <div className="flex flex-wrap items-end gap-8">
                <FormControl>
                  <RadioGroup
                    disabled={pending}
                    onValueChange={(value: TestType) => {
                      form.getValues("testSections").forEach((_, i) => {
                        form.setValue(`testSections.${i}.testType`, value)
                      })

                      field.onChange(value)
                    }}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Listening" />
                      </FormControl>
                      <FormLabel className="font-normal">Listening</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Reading" />
                      </FormControl>
                      <FormLabel className="font-normal">Reading</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled value="Speaking" />
                      </FormControl>
                      <FormLabel className="font-normal">Speaking</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled value="Writing" />
                      </FormControl>
                      <FormLabel className="font-normal">Writing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                {/* <Alert className="h-fit w-[450px] border-danger">
                  <AlertTriangle className="size-4 stroke-danger" />
                  <AlertTitle className="font-semibold text-danger">
                    Danger
                  </AlertTitle>
                  <AlertDescription className="text-danger">
                    If you update the status of a recruitment drive to , you
                    will no longer be able to update the status.
                  </AlertDescription>
                </Alert> */}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testCategoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Test category
                <span className="text-lg font-bold leading-none text-primary">
                  *
                </span>
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={pending}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between border-border bg-transparent",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categoryItems.find(
                            (category) =>
                              category.testCategoryId === field.value
                          )?.testCategoryName
                        : "Select category"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categoryItems.map((category) => (
                          <CommandItem
                            key={category.testCategoryId}
                            onSelect={() => {
                              form.setValue(
                                "testCategoryId",
                                category.testCategoryId
                              )
                            }}
                          >
                            {category.testCategoryName}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                category.testCategoryId === field.value
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
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap items-center gap-3 rounded-[6px] border px-3 py-2">
                {form.getValues("tags").map((tagId) => (
                  <TagBadges
                    key={tagId}
                    disabled={pending}
                    showX
                    onClick={() => handleClickDeleteTestTag(tagId)}
                    tagName={
                      tagItems.find((t) => t.tagId === tagId)?.tagName || ""
                    }
                  />
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={pending}
                        variant="ghost"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        Select tag...
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search tag..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No tag found.</CommandEmpty>
                        <CommandGroup>
                          {tagItems.map((tag) => (
                            <CommandItem
                              key={tag.tagId}
                              onSelect={() => {
                                form.setValue(
                                  "tags",
                                  Array.from(
                                    new Set([
                                      ...form.getValues("tags"),
                                      tag.tagId,
                                    ])
                                  )
                                )
                              }}
                            >
                              {tag.tagName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="testSections"
          render={() => (
            <FormItem>
              <FormLabel>Sections (min 1)</FormLabel>
              <FormControl>
                <SectionFields
                  errors={form.formState.errors}
                  onChangeCorrectOption={handleChangeCorrectOption}
                  onChangeAudio={handleChangeAudioSection}
                  onChangeImagePartition={handleChangeImagePartition}
                  partitionTagItems={partitionTagItems}
                  disabled={pending}
                  testType={form.getValues("testType")}
                  control={form.control}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="float-right" disabled={pending}>
          {type === "create" ? "Submit" : "Save"}{" "}
          {pending && <Icons.Loader className="ml-1 size-4" />}
        </Button>
      </form>
    </Form>
  )
}

export default TestForm
