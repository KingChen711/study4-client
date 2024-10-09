import React from "react"
import { Plus, Trash } from "lucide-react"
import { useFieldArray, type Control, type FieldErrors } from "react-hook-form"

import { cn, indexToAlphabet } from "@/lib/utils"
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
import { Label } from "@/components/ui/label"
import MultipleChoiceRadioGroupItem from "@/components/ui/multiple-choice-radio-group-item"
import { RadioGroup } from "@/components/ui/radio-group"

import { type THandleChangeCorrectOption } from "./test-form"

type Props = {
  control: Control<TMutationTestSchema>
  disabled: boolean
  sectionIndex: number
  partitionIndex: number
  questionIndex: number
  isMultipleChoice: boolean
  errors: FieldErrors<TMutationTestSchema>
  onChangeCorrectOption: (params: THandleChangeCorrectOption) => void
}

function QuestionAnswersField({
  control,
  disabled,
  partitionIndex,
  questionIndex,
  sectionIndex,
  isMultipleChoice,
  errors,
  onChangeCorrectOption,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    name: `testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers`,
    control,
  })

  const questionAnswerMessage =
    errors?.testSections?.[sectionIndex]?.testSectionPartitions?.[
      partitionIndex
    ]?.questions?.[questionIndex]?.questionAnswers?.message

  return (
    <>
      <Label className={cn(questionAnswerMessage && "text-destructive")}>
        {isMultipleChoice
          ? "Answer options (min 2)"
          : "Answers to check (min 1)"}
      </Label>

      {questionAnswerMessage && (
        <div className="text-sm text-destructive">{questionAnswerMessage}</div>
      )}

      {!isMultipleChoice &&
        fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-x-4">
            <FormField
              control={control}
              name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers.${index}.answerText`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder="Example: 26 JULY"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
        ))}

      {isMultipleChoice && (
        <RadioGroup className="flex flex-col gap-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-x-2">
              <FormField
                control={control}
                name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers.${index}.isTrue`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-x-2">
                      <MultipleChoiceRadioGroupItem
                        checked={field.value}
                        value={String(index)}
                        onClick={() =>
                          onChangeCorrectOption({
                            sectionIndex,
                            partitionIndex,
                            questionIndex,
                            questionAnswerIndex: index,
                          })
                        }
                      />
                      <p className="font-bold">{indexToAlphabet(index)}.</p>
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center gap-x-4">
                <FormField
                  control={control}
                  name={`testSections.${sectionIndex}.testSectionPartitions.${partitionIndex}.questions.${questionIndex}.questionAnswers.${index}.answerText`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          disabled={disabled}
                          placeholder="Answer option..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={fields.length <= 2 || disabled}
                  onClick={() => {
                    if (fields.length <= 2) return
                    remove(index)
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <Trash className="size-5 text-danger" />
                </Button>
              </div>
            </div>
          ))}
        </RadioGroup>
      )}

      <div
        onClick={() => {
          if (isMultipleChoice && fields.length >= 26) return
          append(
            isMultipleChoice
              ? {
                  answerText: "",
                  isTrue: false,
                }
              : {
                  answerText: "",
                  isTrue: true,
                }
          )
        }}
        className={cn(
          "group col-span-6 flex cursor-pointer items-center justify-center rounded-2xl bg-muted py-4 text-xs font-bold",
          (disabled || (isMultipleChoice && fields.length >= 26)) &&
            "pointer-events-none"
        )}
      >
        <Plus className="mr-1 size-5 font-extrabold group-hover:text-primary" />
        <p className="group-hover:text-primary">
          MORE {isMultipleChoice ? "OPTION" : "ANSWER"}
        </p>
      </div>
    </>
  )
}

export default QuestionAnswersField
