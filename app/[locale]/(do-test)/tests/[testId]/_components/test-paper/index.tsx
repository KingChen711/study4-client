"use client"

import React, { useEffect, useState } from "react"
import { type TestGrade } from "@/queries/test/get-history"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import { type DoTest } from "@/types/do-test"

import SectionContent from "./section-content"
import SectionTabs from "./section-tabs"

type Props = {
  test: DoTest
  showAnswer?: boolean
  testGrades?: TestGrade[]
}

function TestPaper({ test, showAnswer = false, testGrades = [] }: Props) {
  const testSections = test.testSections
  const { highlightedQuestion } = useHighlightQuestion()

  const [activeSection, setActiveSection] = useState<string>(
    testSections[0].testSectionName
  )

  function handleClickSection(sectionName: string) {
    setActiveSection(sectionName)
  }

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
  }, [highlightedQuestion])

  return (
    <section className="flex flex-1 flex-col gap-y-6 rounded-lg border bg-card p-4">
      <SectionTabs
        sections={testSections}
        activeSection={activeSection}
        onClickSection={handleClickSection}
      />
      <SectionContent
        section={testSections.find((s) => s.testSectionName === activeSection)!}
        showAnswer={showAnswer}
        testGrades={testGrades}
      />
    </section>
  )
}

export default TestPaper
