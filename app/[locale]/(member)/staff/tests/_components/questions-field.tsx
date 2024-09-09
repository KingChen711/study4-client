import React from "react"
import { editorPlugin } from "@/constants"
import { type TestType } from "@/types"
import { Editor } from "@tinymce/tinymce-react"
import { Plus, Trash2Icon } from "lucide-react"
import { useFieldArray, type Control, type FieldErrors } from "react-hook-form"

import { cn } from "@/lib/utils"
import { type TMutationTestSchema } from "@/lib/validation/mutation-test"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import QuestionAnswersField from "./question-answers-field"
import { testTypeToSectionPrefix } from "./sections-field"
import { type THandleChangeCorrectOption } from "./test-form"

type Props = {
  control: Control<TMutationTestSchema>
  disabled: boolean
  sectionIndex: number
  partitionIndex: number
  testType: TestType
  errors: FieldErrors<TMutationTestSchema>
  onChangeCorrectOption: (params: THandleChangeCorrectOption) => void
}

function QuestionsField({
  control,
  disabled,
  partitionIndex,
  sectionIndex,
  testType,
  errors,
  onChangeCorrectOption,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: `testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions`,
    control,
  })

  return (
    <>
      {fields.map((fieldQ, index) => (
        <div
          key={fieldQ.id}
          className="rounded-xl border-2 border-violet-500 py-4"
        >
          <div className="flex items-center justify-between border-b-2 border-violet-500 px-4 pb-2">
            <div className="flex items-center gap-x-3">
              <label className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {`${testTypeToSectionPrefix[testType]} ${sectionIndex + 1} > Partition ${partitionIndex + 1} > Question ${index + 1} (${fieldQ.isMultipleChoice ? "Multiple choice" : "Fill blank"})`}
              </label>
            </div>
            <Button
              disabled={disabled}
              onClick={() => remove(index)}
              variant="ghost"
              size="icon"
            >
              <Trash2Icon className="size-6 text-danger" />
            </Button>
          </div>

          <div className="flex flex-col gap-y-4 p-4">
            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${index}.questionDesc`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Question title
                    {fieldQ.isMultipleChoice && (
                      <span className="text-lg font-bold leading-none text-primary">
                        *
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder="Question title..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${index}.questionAnswerExplanation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Question answer explanation
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

            {!fieldQ.isMultipleChoice && (
              <FormField
                control={control}
                name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${index}.answerDisplay`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Answer display
                      <span className="text-lg font-bold leading-none text-primary">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled}
                        placeholder="Example: 26TH (OF) JULY [OR] JULY 26(TH) [OR] 26 JULY"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <QuestionAnswersField
              control={control}
              disabled={disabled}
              sectionIndex={sectionIndex}
              partitionIndex={partitionIndex}
              questionIndex={index}
              isMultipleChoice={fieldQ.isMultipleChoice}
              errors={errors}
              onChangeCorrectOption={onChangeCorrectOption}
            />
          </div>
        </div>
      ))}
      <div className="grid grid-cols-12 gap-4">
        <div
          onClick={() => {
            append({
              isMultipleChoice: false,
              questionDesc: "",
              questionAnswerExplanation: "",
              questionAnswers: [{ isTrue: true, answerText: "" }],
            })
          }}
          className={cn(
            "group col-span-6 flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-6 text-sm font-bold",
            disabled && "pointer-events-none"
          )}
        >
          <Plus className="mr-1 size-5 font-extrabold group-hover:text-violet-500" />
          <p className="group-hover:text-violet-500">
            MORE FILL BLANK QUESTION
          </p>
        </div>
        <div
          onClick={() => {
            append({
              isMultipleChoice: true,
              questionDesc: "",
              questionAnswerExplanation: "",
              questionAnswers: [
                { isTrue: true, answerText: "" },
                { isTrue: false, answerText: "" },
                { isTrue: false, answerText: "" },
              ],
            })
          }}
          className={cn(
            "group col-span-6 flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-6 text-sm font-bold",
            disabled && "pointer-events-none"
          )}
        >
          <Plus className="mr-1 size-5 font-extrabold group-hover:text-violet-500" />
          <p className="group-hover:text-violet-500">
            MORE MULTIPLE CHOICE QUESTION
          </p>
        </div>
      </div>
    </>
  )
}

export default QuestionsField
