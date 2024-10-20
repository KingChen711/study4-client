"use client"

import React, { useEffect } from "react"
import { type TestGrade } from "@/queries/test/get-history"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import { type DoTest } from "@/types/do-test"
import { useActiveSection } from "@/hooks/use-active-section"

import SectionContent from "./section-content"

type Props = {
  test: DoTest
  showAnswer?: boolean
  testGrades?: TestGrade[]
}

function TestPaper({ test, showAnswer = false, testGrades = [] }: Props) {
  const testSections = test.testSections
  const { highlightedQuestion } = useHighlightQuestion()

  const { activeSection, setActiveSection } = useActiveSection()

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
    <section className="flex h-full flex-1 flex-col gap-y-6 rounded-lg border p-4">
      <SectionContent
        section={
          testSections.find((s) => s.testSectionName === activeSection) ||
          testSections[0]
        }
        showAnswer={showAnswer}
        testGrades={testGrades}
      />
    </section>
  )
}

export default TestPaper
