import React from "react"
import { type TestType } from "@/types"
import { Plus, Trash2Icon } from "lucide-react"
import { useFieldArray, type Control, type FieldErrors } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  createSection,
  type TMutationTestSchema,
} from "@/lib/validation/mutation-test"
import { type PartitionTag } from "@/hooks/use-answer-transcript"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Recording from "@/components/ui/recording"

import PartitionsField from "./partitions-field"
import { type THandleChangeCorrectOption } from "./test-form"

export const testTypeToSectionPrefix = {
  Listening: "Recording",
  Reading: "Passage",
  Speaking: "Unknown",
  Writing: "Unknown",
}

type Props = {
  control: Control<TMutationTestSchema>
  testType: TestType
  disabled: boolean
  partitionTagItems: PartitionTag[]
  errors: FieldErrors<TMutationTestSchema>
  onChangeCorrectOption: (params: THandleChangeCorrectOption) => void
}

function SectionFields({
  control,
  testType,
  disabled,
  partitionTagItems,
  errors,
  onChangeCorrectOption,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: "testSections",
    control,
  })

  const handleAudioUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const audioURL = URL.createObjectURL(file)
      fieldChange(audioURL)
    }
  }

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="flex flex-col gap-y-2 rounded-2xl border-2 border-info py-4"
          >
            <div className="flex items-center justify-between border-b-2 border-info px-4 pb-2">
              <div className="flex items-center gap-x-3">
                <label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {`${testTypeToSectionPrefix[testType]} ${index + 1}`}
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
                <Trash2Icon className="size-6 text-danger" />
              </Button>
            </div>

            <div className="flex flex-col gap-y-4 p-4">
              {testType === "Listening" && (
                <>
                  <FormField
                    control={control}
                    name={`testSections.${index}.audioResource`}
                    render={({ field }) => (
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
                              disabled={disabled}
                              onChange={(e) =>
                                handleAudioUpload(e, field.onChange)
                              }
                              type="file"
                              accept="audio/*"
                              className="w-fit"
                            />

                            <Recording srcUrl={field.value || null} />
                          </>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`testSections.${index}.sectionTranscript`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Transcript
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={disabled}
                            placeholder="Transcript..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {testType === "Reading" && (
                <FormField
                  control={control}
                  name={`testSections.${index}.readingDesc`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Reading passage
                        <span className="text-lg font-bold leading-none text-primary">
                          *
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={disabled}
                          placeholder="Reading passage..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <PartitionsField
                testType={testType}
                partitionTagItems={partitionTagItems}
                control={control}
                disabled={disabled}
                sectionIndex={index}
                errors={errors}
                onChangeCorrectOption={onChangeCorrectOption}
              />
            </div>
          </div>
        )
      })}
      <div
        onClick={() => {
          append(createSection({ testType: testType }))
        }}
        className={cn(
          "group flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-10 text-lg font-bold",
          disabled && "pointer-events-none"
        )}
      >
        <Plus className="mr-1 size-5 font-extrabold group-hover:text-info" />
        <p className="group-hover:text-info">MORE SECTION</p>
      </div>
    </>
  )
}

export default SectionFields
