"use client"

import React, { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronDown, ChevronUp, X } from "lucide-react"
import { toast } from "sonner"

import { cn, newDate } from "@/lib/utils"
import { submitFlashcardExam } from "@/actions/flashcard/submit-flashcard-exam"
import useFlashcardPractice from "@/hooks/use-flashcard-practice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type Props = {
  flashcardId: number
  title: string
  totalQuestion: number
}

type QuestionAnswer = {
  questionNumber: number
  questionDesc: string
  questionType: string
  flashcardDetailId: number
  answer: string
}

function ExamSection({ flashcardId, title, totalQuestion }: Props) {
  const [time, setTime] = useState<number>(0)
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [showSetting, setShowSetting] = useState(true)
  const [focusIndex, setFocusIndex] = useState<Map<number, number>>(
    new Map<number, number>()
  )
  const [questionsAmount, setQuestionsAmount] = useState(
    Math.min(20, totalQuestion)
  )
  const [questionTypes, setQuestionTypes] = useState<string[]>([
    "Multiple choice",
  ])
  const [isTermPattern, setIsTermPattern] = useState(false)
  const [showIsTermDropdown, setShowIsTermDropdown] = useState(false)

  const handleQuestionTypeChange = (value: boolean, type: string) => {
    if (value) {
      setQuestionTypes((prev) => [...prev, type])
    } else {
      setQuestionTypes((prev) => prev.filter((t) => t !== type))
    }
  }
  const [usedMatchings, setUsedMatchings] = useState<
    Map<number, { above: number; below: number }[]>
  >(new Map<number, { above: number; below: number }[]>())

  const { data: questions, isPending } = useFlashcardPractice(
    !showSetting,
    flashcardId,
    {
      isTermPattern,
      questionTypes,
      totalQuestion,
    }
  )

  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([])

  const handleSubmit = () => {
    if (pending) return

    startTransition(async () => {
      const res = await submitFlashcardExam({
        flashcardId,
        isSaveWrongToVocabSchedule: true,
        isTermPattern,
        questionAnswers,
        takenDate: newDate(),
        totalCompletionTime: time,
      })

      if (res.isSuccess) {
        router.push(`/flashcards/list/${flashcardId}/privacy`)
        return
      }

      toast.error(res.messageError)
    })
  }

  useEffect(() => {
    if (!questions) return

    setQuestionAnswers(() => {
      const res: QuestionAnswer[] = []

      questions.forEach((q) => {
        if (q.questionType === "Matching question") {
          res.push(
            ...q.matchingQuestions.map((q) => ({
              answer: "",
              flashcardDetailId: q.flashcardDetailId,
              questionDesc: q.questionDesc || "",
              questionNumber: q.questionNumber,
              questionType: "Matching question",
            }))
          )
        } else {
          res.push({
            answer: "",
            flashcardDetailId: q.flashcardDetailId,
            questionDesc: q.questionDesc || "",
            questionNumber: q.questionNumber,
            questionType: q.questionType,
          })
        }
      })

      return res
    })

    setFocusIndex(() => {
      const map = new Map<number, number>()

      questions.forEach((q, i) => {
        if (q.questionType === "Matching question") {
          map.set(i, q.matchingQuestions[0].questionNumber - 1)
        }
      })

      return map
    })
  }, [questions])

  useEffect(() => {
    function updateTime() {
      if (pending || showSetting || (!showSetting && isPending)) return
      setTime((prev) => prev + 1)
    }

    const timer = setInterval(updateTime, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [pending, showSetting, isPending])

  useEffect(() => {
    console.log(focusIndex)
  }, [focusIndex])
  useEffect(() => {
    console.log(questionAnswers)
  }, [questionAnswers])

  return (
    <>
      {showSetting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          <Card className="w-full max-w-md">
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-normal text-gray-400">
                {title}
              </CardTitle>
              <h2 className="text-2xl font-bold">Thiết lập bài kiểm tra</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="questions" className="text-sm">
                  Số câu hỏi (tối đa {totalQuestion})
                </Label>
                <Input
                  id="questions"
                  type="number"
                  className="w-16 text-right"
                  onChange={(e) => setQuestionsAmount(+e.target.value)}
                  value={questionsAmount}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="answer-type" className="text-sm">
                  Trả lời bằng
                </Label>
                <div className="relative">
                  <div
                    onClick={() => setShowIsTermDropdown((prev) => !prev)}
                    className="flex cursor-pointer items-center gap-x-2 border px-3 py-1 text-sm"
                  >
                    {!isTermPattern ? "Thuật ngữ" : "Định nghĩa"}
                    {showIsTermDropdown ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "absolute z-10 hidden flex-col rounded-xl border bg-background",
                      showIsTermDropdown && "flex"
                    )}
                  >
                    {["Thuật ngữ", "Định nghĩa"].map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex cursor-pointer items-center gap-x-2 text-nowrap px-4 py-2 text-sm hover:bg-neutral-100",
                          ((!isTermPattern && item === "Thuật ngữ") ||
                            (isTermPattern && item === "Định nghĩa")) &&
                            "pointer-events-none bg-neutral-100"
                        )}
                        onClick={() => {
                          setIsTermPattern((prev) => !prev)
                          setShowIsTermDropdown(false)
                        }}
                      >
                        {item}{" "}
                        {!isTermPattern && item === "Thuật ngữ" && (
                          <Check className="size-4" />
                        )}
                        {isTermPattern && item === "Định nghĩa" && (
                          <Check className="size-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="true-false" className="text-sm">
                    Đúng/Sai
                  </Label>
                  <Switch
                    disabled={
                      questionTypes.includes("True/False") &&
                      questionTypes.length === 1
                    }
                    onCheckedChange={(value) =>
                      handleQuestionTypeChange(value, "True/False")
                    }
                    checked={questionTypes.includes("True/False")}
                    id="true-false"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="multiple-choice" className="text-sm">
                    Trắc nghiệm
                  </Label>
                  <Switch
                    disabled={
                      questionTypes.includes("Multiple choice") &&
                      questionTypes.length === 1
                    }
                    onCheckedChange={(value) =>
                      handleQuestionTypeChange(value, "Multiple choice")
                    }
                    id="multiple-choice"
                    checked={questionTypes.includes("Multiple choice")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="fill-blank" className="text-sm">
                    Ghép thẻ
                  </Label>
                  <Switch
                    disabled={
                      questionTypes.includes("Matching question") &&
                      questionTypes.length === 1
                    }
                    onCheckedChange={(value) =>
                      handleQuestionTypeChange(value, "Matching question")
                    }
                    checked={questionTypes.includes("Matching question")}
                    id="fill-blank"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="essay" className="text-sm">
                    Tự luận
                  </Label>
                  <Switch
                    disabled={
                      questionTypes.includes("Written") &&
                      questionTypes.length === 1
                    }
                    onCheckedChange={(value) =>
                      handleQuestionTypeChange(value, "Written")
                    }
                    checked={questionTypes.includes("Written")}
                    id="essay"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  if (questionsAmount < 1 || questionsAmount > totalQuestion) {
                    toast.error("Số câu hỏi không hợp lệ.")
                    return
                  }
                  setShowSetting(false)
                }}
                className="w-full"
              >
                Bắt đầu làm kiểm tra
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {!showSetting && isPending && (
        <div className="flex size-full items-center justify-center">
          <Icons.Loader className="size-12" />
        </div>
      )}

      {questions && questions.length > 0 && (
        <div className="mb-8 flex w-full flex-col gap-y-6 pt-4">
          {questions.map((q, i) => (
            <React.Fragment key={q.flashcardDetailId}>
              {questions[i].questionType !== "Matching question" ? (
                <div className="flex min-h-[400px] w-full flex-col rounded-xl border bg-neutral-100 px-8 py-6 shadow-lg">
                  <div className="mb-2 flex shrink-0 items-center justify-between gap-x-4">
                    <div className="mb-2 text-sm font-medium">
                      {q.questionType !== "True/False" &&
                        (isTermPattern ? "Thuật ngữ" : "Định nghĩa")}
                    </div>
                    <div className="mb-2 flex font-medium">
                      {q.questionNumber}/{totalQuestion}
                    </div>
                  </div>
                  {q.questionType === "Multiple choice" && (
                    <>
                      <div className="mb-4 flex-1 text-xl">
                        {q.questionTitle}
                      </div>
                      <div className="shrink-0">
                        <div className="my-4 font-medium">
                          Chọn {!isTermPattern ? "thuật ngữ" : "định nghĩa"}{" "}
                          đúng
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                          {q.questionAnswers.map((qa, j) => (
                            <div
                              key={qa.answerText + j}
                              className={cn(
                                "col-span-12 cursor-pointer rounded-xl border-2 px-4 py-2 shadow sm:col-span-6",
                                pending && "pointer-events-none",
                                questionAnswers[q.questionNumber - 1]
                                  ?.answer === qa.answerText &&
                                  "pointer-events-none border-primary bg-neutral-300"
                              )}
                              onClick={() => {
                                setQuestionAnswers((prev) => {
                                  const clone = structuredClone(prev)
                                  clone[q.questionNumber - 1].answer =
                                    qa.answerText
                                  return clone
                                })
                              }}
                            >
                              {qa.answerText}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {q.questionType === "True/False" && (
                    <>
                      <div className="grid flex-1 grid-cols-12">
                        <div className="col-span-12 flex flex-col pb-4 sm:col-span-6 sm:pb-0 sm:pr-4">
                          <div className="mb-2 text-sm font-medium">
                            {isTermPattern ? "Thuật ngữ" : "Định nghĩa"}
                          </div>
                          <p>{q.questionTitle}</p>
                        </div>
                        <div className="col-span-12 flex flex-col border-t-2 pt-4 sm:col-span-6 sm:border-l-2 sm:border-t-0 sm:pl-4 sm:pt-0">
                          <div className="mb-2 text-sm font-medium">
                            {!isTermPattern ? "Thuật ngữ" : "Định nghĩa"}
                          </div>
                          <p>{q.questionDesc}</p>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <div className="my-4 font-medium">Chọn câu trả lời</div>
                        <div className="grid grid-cols-12 gap-6">
                          <div
                            className={cn(
                              "col-span-12 cursor-pointer rounded-xl border-2 px-4 py-2 shadow sm:col-span-6",
                              pending && "pointer-events-none",
                              questionAnswers[q.questionNumber - 1]?.answer ===
                                q.questionDesc &&
                                "pointer-events-none border-primary bg-neutral-300"
                            )}
                            onClick={() => {
                              setQuestionAnswers((prev) => {
                                const clone = structuredClone(prev)
                                clone[q.questionNumber - 1].answer =
                                  q.questionAnswers[0].answerText
                                return clone
                              })
                            }}
                          >
                            Đúng
                          </div>
                          <div
                            className={cn(
                              "col-span-12 cursor-pointer rounded-xl border-2 px-4 py-2 shadow sm:col-span-6",
                              questionAnswers[q.questionNumber - 1]?.answer &&
                                questionAnswers[q.questionNumber - 1].answer !==
                                  q.questionDesc &&
                                "pointer-events-none border-primary bg-neutral-300"
                            )}
                            onClick={() => {
                              setQuestionAnswers((prev) => {
                                const clone = structuredClone(prev)
                                clone[q.questionNumber - 1].answer =
                                  q.questionAnswers[1].answerText
                                return clone
                              })
                            }}
                          >
                            Sai
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {q.questionType === "Written" && (
                    <>
                      <div className="mb-4 flex-1 text-xl">
                        {q.questionTitle}
                      </div>
                      <div className="shrink-0">
                        <div className="my-4 font-medium">Đáp án của bạn</div>
                        <Input
                          value={
                            questionAnswers[q.questionNumber - 1]?.answer || ""
                          }
                          onChange={(e) => {
                            setQuestionAnswers((prev) => {
                              const clone = structuredClone(prev)
                              clone[q.questionNumber - 1].answer =
                                e.target.value
                              return clone
                            })
                          }}
                          disabled={pending}
                          placeholder="Nhập đáp án..."
                        />
                      </div>
                    </>
                  )}

                  {/* <Button
                      variant="ghost"
                      className="mx-auto mt-6 font-medium text-primary"
                    >
                      Bạn không biết?
                    </Button> */}
                </div>
              ) : (
                <div className="my-8 flex min-h-[400px] w-full flex-col rounded-xl border bg-neutral-100 px-8 py-6 shadow-lg">
                  <div className="mb-2 flex shrink-0 items-center justify-between gap-x-4">
                    <div className="mb-2 text-sm font-medium">
                      Câu hỏi chọn đáp án
                    </div>
                    <div className="mb-2 flex font-medium">
                      {q.matchingQuestions[0].questionNumber}-
                      {
                        q.matchingQuestions[q.matchingQuestions.length - 1]
                          .questionNumber
                      }
                      /{totalQuestion}
                    </div>
                  </div>
                  <div className="border-b-2 border-neutral-600 pb-4 text-lg font-medium">
                    Nhấp vào {!isTermPattern ? "thuật ngữ" : "định nghĩa"} để
                    ghép với {isTermPattern ? "thuật ngữ" : "định nghĩa"}
                  </div>

                  <div className="mt-6 grid grid-cols-12 gap-4 border-b-2 border-neutral-600 pb-6">
                    {questions[i].matchingQuestions.map((mq, mqIndex) => {
                      const questionIndex =
                        q.matchingQuestions[mqIndex].questionNumber - 1
                      return (
                        <React.Fragment key={mq.flashcardDetailId}>
                          <div className="col-span-6 flex items-center">
                            {
                              questions[i].matchingQuestions[mqIndex]
                                .questionTitle
                            }
                          </div>
                          <div
                            onClick={() => {
                              if (
                                focusIndex.get(i) === questionIndex ||
                                questionAnswers[questionIndex]?.answer.length >
                                  0
                              )
                                return
                              setFocusIndex((prev) => {
                                const clone = structuredClone(prev)
                                clone.set(i, questionIndex)
                                return clone
                              })
                            }}
                            className={cn(
                              "col-span-6 flex min-h-12 cursor-pointer items-center justify-between gap-x-4 rounded border-2 border-dashed border-neutral-700 bg-neutral-300 px-4 py-2",
                              focusIndex.get(i) === questionIndex &&
                                "cursor-default justify-center border-solid border-primary font-bold text-primary",
                              questionAnswers[questionIndex]?.answer.length >
                                0 &&
                                "cursor-default border-solid text-sm font-medium"
                            )}
                          >
                            {focusIndex.get(i) === questionIndex
                              ? "Chọn từ danh sách bên dưới"
                              : ""}
                            {questionAnswers[questionIndex]?.answer.length >
                              0 && (
                              <>
                                <div>
                                  {questionAnswers[questionIndex].answer}
                                </div>
                                <X
                                  onClick={() => {
                                    setFocusIndex((prev) => {
                                      const clone = structuredClone(prev)
                                      clone.set(i, questionIndex)
                                      return clone
                                    })
                                    setUsedMatchings((prev) => {
                                      const clone = structuredClone(prev)
                                      clone.set(
                                        i,
                                        clone
                                          .get(i)
                                          ?.filter(
                                            (um) => um.above !== questionIndex
                                          ) || []
                                      )
                                      return clone
                                    })
                                    setQuestionAnswers((prev) => {
                                      const clone = structuredClone(prev)

                                      clone[questionIndex].answer = ""
                                      return clone
                                    })
                                  }}
                                  className="size-4 cursor-pointer"
                                />
                              </>
                            )}
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {questions[i].questionAnswers.map((qa, qaIndex) => (
                      <div
                        key={qa.answerText + qaIndex}
                        className={cn(
                          "w-fit cursor-pointer rounded-lg border border-neutral-700 px-3 py-1 text-sm font-medium hover:border-primary",
                          usedMatchings
                            .get(i)
                            ?.find((um) => um.below === qaIndex) &&
                            "pointer-events-none border-transparent opacity-50"
                        )}
                        onClick={() => {
                          setQuestionAnswers((prev) => {
                            const clone = structuredClone(prev)

                            if (focusIndex.get(i) !== undefined) {
                              clone[focusIndex.get(i)!].answer = qa.answerText
                            }
                            return clone
                          })
                          setUsedMatchings((prev) => {
                            const clone = structuredClone(prev)

                            clone.set(i, [
                              ...(clone.get(i) || []),
                              {
                                above: focusIndex.get(i)!,
                                below: qaIndex,
                              },
                            ])

                            return clone
                          })
                          setFocusIndex((prev) => {
                            const clone = structuredClone(prev)
                            let newIndex = clone.get(i)! + 1

                            while (clone.get(i)! !== newIndex) {
                              if (
                                newIndex ===
                                questions[i].matchingQuestions[
                                  questions[i].matchingQuestions.length - 1
                                ].questionNumber
                              ) {
                                newIndex =
                                  questions[i].matchingQuestions[0]
                                    .questionNumber - 1
                              }
                              if (
                                questionAnswers[newIndex]?.answer.length > 0
                              ) {
                                newIndex++
                              } else {
                                clone.set(i, newIndex)
                                return clone
                              }
                            }
                            clone.set(i, -1)
                            return clone
                          })
                        }}
                      >
                        {qa.answerText}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {questions && questions.length > 0 && (
        <section className="mb-16 mt-8 flex flex-col items-center">
          <h3 className="mb-6 text-xl font-bold">
            Tất cả đã xong! Bạn đã sẵn sàng gửi bài kiểm tra?
          </h3>
          <Button
            disabled={pending}
            onClick={handleSubmit}
            size="lg"
            className="w-fit"
          >
            Gửi bài kiểm tra
            {pending && <Icons.Loader className="ml-1 size-4" />}
          </Button>
        </section>
      )}
    </>
  )
}

export default ExamSection
