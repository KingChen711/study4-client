"use client"

import React, { useEffect, useState } from "react"
import { type TestGrade } from "@/queries/test/get-history"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import { type DoTest } from "@/types/do-test"
import { useActiveSection } from "@/hooks/use-active-section"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import SectionContent from "./section-content"

type Props = {
  test: DoTest
  showAnswer?: boolean
  testGrades?: TestGrade[]
}

function TestPaper({ test, showAnswer = false, testGrades = [] }: Props) {
  const testSections = test.testSections
  const { highlightedQuestion } = useHighlightQuestion()
  const [isHighlightMode, setIsHighlightMode] = useState(false)

  const { activeSection, setActiveSection } = useActiveSection()

  const handleMouseUp = () => {
    if (isHighlightMode) {
      const selectedText = window.getSelection()
      if (!selectedText) return

      try {
        if (selectedText.rangeCount > 0) {
          const range = selectedText.getRangeAt(0)
          const span = document.createElement("mark") // Sử dụng thẻ <mark> để highlight
          range.surroundContents(span)
          selectedText.removeAllRanges() // Bỏ lựa chọn
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setActiveSection(testSections[0].testSectionName)
  }, [setActiveSection, testSections])

  useEffect(() => {
    useSubmitAnswers.getState().initAnswer(
      testSections.flatMap((ts) =>
        ts.testSectionPartitions.flatMap((tsp) =>
          tsp.questions.map((q) => {
            return {
              questionId: q.questionId,
              questionNumber: q.questionNumber,
              sectionName: ts.testSectionName,
              selectedAnswer: "",
            }
          })
        )
      )
    )
  }, [testSections])

  useEffect(() => {
    if (!highlightedQuestion) return
    setActiveSection(highlightedQuestion.sectionName)
  }, [highlightedQuestion, setActiveSection])

  return (
    <section
      onMouseUp={handleMouseUp}
      className="flex h-full flex-1 flex-col gap-y-6 rounded-lg border p-4"
    >
      <div className="flex items-center space-x-2">
        <Switch
          checked={isHighlightMode}
          onCheckedChange={setIsHighlightMode}
          id="airplane-mode"
        />
        <Label htmlFor="airplane-mode">Highlight Mode</Label>
      </div>

      {testSections.map((ts) => (
        <SectionContent
          key={ts.testSectionId}
          section={ts}
          active={ts.testSectionName === activeSection}
          showAnswer={showAnswer}
          testGrades={testGrades}
        />
      ))}
    </section>
  )
}

export default TestPaper
