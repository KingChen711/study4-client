"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  type Tag,
  type TestCategory,
} from "@/queries/test/create-test-items/get-create-test-items"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangle, CheckIcon, Plus, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  createSection,
  mutationTestSchema,
  type TMutationTestSchema,
} from "@/lib/validation/muation-test"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import ErrorMessage from "@/components/ui/error-message"
import {
  Form,
  FormControl,
  FormDescription,
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
import Recording from "@/components/ui/recording"
import TagBadges from "@/components/badges/tag-badge"

const testTypeToSectionPrefix = {
  Listening: "Recording",
  Reading: "Passage",
  Speaking: "Unknown",
  Writing: "Unknown",
}

type Props = {
  categoryItems: TestCategory[]
  tagItems: Tag[]
  type: "create" | "update"
  testId?: string
} & (
  | {
      type: "create"
    }
  | {
      type: "update"
      testId: string
    }
)

function TestForm({ type, testId, categoryItems, tagItems }: Props) {
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)

  const form = useForm<TMutationTestSchema>({
    resolver: zodResolver(mutationTestSchema),
    defaultValues: {
      testTitle: "",
      testType: "Listening",
      totalQuestion: 0,
      totalSection: 1,
      tags: [],
      testSections: [
        createSection({ sectionNumber: 1, testType: "Listening" }),
      ],
    },
  })

  const testSectionsErrors = useMemo(
    () => form.formState.errors.testSections || [],
    [form.formState.errors]
  )

  const testType = form.getValues("testType")

  //   const { mutate, isPending } = useMutateTest(type)

  // Get updated test
  //   const { isLoading } = useTest(testId, (test) => {
  //     form.setValue("code", test.code)
  //     form.setValue("name", test.name)
  //     form.setValue("description", test.description || "")
  //     form.setValue("color", test.color)
  //     form.setValue("icon", test.icon)
  //   })

  //   const disabling = useMemo(
  //     () => isPending || isLoading,
  //     [isPending, isLoading]
  //   )

  const disabling = false

  const onSubmit = async (values: TMutationTestSchema) => {
    console.log({ values })

    // const formData = new FormData()
    // formData.append("code", values.code)
    // formData.append("name", values.name)
    // formData.append("description", values.description || "")
    // formData.append("color", values.color)
    // formData.append("image", file as any)
    // if (type === "update") {
    //   formData.append("id", testId)
    // }
    // mutate(formData, {
    //   onSuccess: () => {
    //     toast({
    //       title: `Test has been ${type === "create" ? "created" : "updated"} successfully`,
    //       variant: "success",
    //     })
    //     return navigate({
    //       to: "/tests",
    //       search: {
    //         pageNumber: 1,
    //         pageSize: 5,
    //         search: "",
    //         status: "All",
    //         sort: "-createdAt",
    //       },
    //     })
    //   },
    //   onError: (error) => {
    //     if (
    //       isFormError<TMutateTestErrors>(error) &&
    //       error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY
    //     ) {
    //       const fieldErrors = error.response?.data.errors
    //       const keys = Object.keys(fieldErrors) as (keyof TMutateTestErrors)[]
    //       keys.forEach((key) =>
    //         form.setError(key, { message: fieldErrors[key] })
    //       )
    //       form.setFocus(keys[0])
    //       return
    //     }
    //     if (
    //       !isBaseError(error) ||
    //       error.response?.status === StatusCodes.INTERNAL_SERVER_ERROR
    //     ) {
    //       toast({
    //         title: `Test has been ${type === "create" ? "created" : "updated"} failure`,
    //         description: "Some thing went wrong.",
    //         variant: "danger",
    //       })
    //       return
    //     }
    //     toast({
    //       title: `Test has been ${type === "create" ? "created" : "updated"} failure`,
    //       description: error.response?.data.message,
    //       variant: "danger",
    //     })
    //   },
    // })
  }

  const handleClickDeleteTestTag = (tagId: number) => {
    form.setValue(
      "tags",
      form.getValues("tags").filter((t) => t !== tagId)
    )
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

      setFile(file)

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""
        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const handleAudioUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const audioURL = URL.createObjectURL(file)

      const testSectionsClone = structuredClone(form.getValues("testSections"))
      const section = testSectionsClone.find((ts) => ts.id === sectionId)
      if (section) {
        section.audioResource = audioURL
      }

      form.setValue("testSections", testSectionsClone)
    }
  }

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
                  disabled={disabling}
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
                  disabled={disabling}
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
                    onValueChange={field.onChange}
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
                        <RadioGroupItem value="Speaking" />
                      </FormControl>
                      <FormLabel className="font-normal">Speaking</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Writing" />
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
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between bg-transparent",
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sections (min 1)</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-y-4">
                  {field.value.map((s, testSectionIndex) => {
                    const section = form
                      .getValues("testSections")
                      .find((ts) => ts.id === s.id)!

                    return (
                      <FormItem key={section.id}>
                        <FormControl>
                          <div className="flex flex-col rounded-2xl border">
                            <div className="flex items-center justify-between border-b-[3px] border-background px-4 py-3">
                              <div className="flex items-center gap-x-3">
                                <label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  {`${testTypeToSectionPrefix[testType]} ${testSectionIndex + 1}`}
                                </label>

                                <ErrorMessage
                                  name={`section ${testSectionIndex}`}
                                  message={
                                    testSectionsErrors[testSectionIndex]
                                      ?.message
                                  }
                                />
                              </div>
                              <Button
                                disabled={field.value.length <= 1}
                                onClick={() => {
                                  // ko cần check chỗ này vì đã check disable ở trên, nhưng cứ check cho chắc
                                  if (field.value.length > 1) {
                                    form.setValue(
                                      "testSections",
                                      field.value.filter(
                                        (ts) => ts.id !== section.id
                                      )
                                    )
                                  }
                                }}
                                variant="ghost"
                                size="icon"
                              >
                                <Trash2Icon className="size-6 text-danger" />
                              </Button>
                            </div>
                            <div className="flex flex-col gap-y-4 p-4 py-2">
                              {testType === "Listening" && (
                                <>
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      Audio resource
                                      <span className="text-lg font-bold leading-none text-primary">
                                        *
                                      </span>
                                    </FormLabel>
                                    <FormControl>
                                      <>
                                        <Input
                                          onChange={(e) =>
                                            handleAudioUpload(e, section.id)
                                          }
                                          type="file"
                                          accept="audio/*"
                                          disabled={disabling}
                                          className="w-fit"
                                        />

                                        <Recording
                                          srcUrl={section.audioResource || null}
                                        />
                                      </>
                                    </FormControl>

                                    <ErrorMessage
                                      name={`section ${testSectionIndex}, audioResource`}
                                      message={
                                        testSectionsErrors[testSectionIndex]
                                          ?.audioResource?.message
                                      }
                                    />
                                  </FormItem>
                                  {/* TODO:convert to editor */}
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      Audio transcript
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        value={section.sectionTranscript}
                                        onChange={(e) => {
                                          const cloneTestSections =
                                            structuredClone(
                                              form.getValues("testSections")
                                            )
                                          const currentSection =
                                            cloneTestSections.find(
                                              (ts) => ts.id === section.id
                                            )
                                          if (currentSection) {
                                            currentSection.sectionTranscript =
                                              e.target.value
                                          }
                                          form.setValue(
                                            "testSections",
                                            cloneTestSections
                                          )
                                        }}
                                        disabled={disabling}
                                        placeholder="Audio transcript..."
                                      />
                                    </FormControl>

                                    <ErrorMessage
                                      name={`section ${testSectionIndex}, sectionTranscript`}
                                      message={
                                        testSectionsErrors[testSectionIndex]
                                          ?.sectionTranscript?.message
                                      }
                                    />
                                  </FormItem>
                                </>
                              )}

                              {testType === "Reading" && (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    Reading passage
                                    <span className="text-lg font-bold leading-none text-primary">
                                      *
                                    </span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      value={
                                        form
                                          .getValues("testSections")
                                          .find((ts) => ts.id === section.id)
                                          ?.readingDesc
                                      }
                                      onChange={(e) => {
                                        const cloneTestSections =
                                          structuredClone(
                                            form.getValues("testSections")
                                          )
                                        const currentSection =
                                          cloneTestSections.find(
                                            (ts) => ts.id === section.id
                                          )
                                        if (currentSection) {
                                          currentSection.readingDesc =
                                            e.target.value
                                        }
                                        form.setValue(
                                          "testSections",
                                          cloneTestSections
                                        )
                                      }}
                                      disabled={disabling}
                                      placeholder="Reading passage..."
                                    />
                                  </FormControl>

                                  <ErrorMessage
                                    name={`section ${testSectionIndex}, readingDesc`}
                                    message={
                                      testSectionsErrors[testSectionIndex]
                                        ?.readingDesc?.message
                                    }
                                  />
                                </FormItem>
                              )}

                              {/* partitions */}
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )
                  })}
                  <div
                    onClick={() => {
                      form.setValue("testSections", [
                        ...field.value,
                        createSection({
                          testType: testType,
                          sectionNumber: form.getValues("totalSection") + 1,
                        }),
                      ])
                    }}
                    className="group flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-10 text-lg font-bold"
                  >
                    <Plus className="mr-1 size-5 font-extrabold group-hover:text-primary" />
                    <p className="group-hover:text-primary">MORE SECTION</p>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="float-right" disabled={disabling}>
          {type === "create" ? "Submit" : "Save"}{" "}
          {disabling && <Icons.Loader className="ml-1 size-4" />}
        </Button>
      </form>
    </Form>
  )
}

export default TestForm
