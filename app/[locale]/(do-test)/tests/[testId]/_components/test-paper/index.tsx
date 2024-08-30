"use client"

import React, { useEffect, useState } from "react"
import { type PracticeTest } from "@/queries/test/get-practice-test"
import { useHighlightQuestion } from "@/stores/use-highlight-question"
import { useSubmitAnswers } from "@/stores/use-submit-answers"

import SectionContent from "./section-content"
import SectionTabs from "./section-tabs"

type Props = {
  test: PracticeTest
}

function TestPaper({ test }: Props) {
  const testSections = test.testSections
  const { initAnswer } = useSubmitAnswers()
  const { highlightedQuestion } = useHighlightQuestion()

  const [activeSection, setActiveSection] = useState<string>(
    testSections[0].testSectionName
  )

  function handleClickSection(sectionName: string) {
    setActiveSection(sectionName)
  }

  useEffect(() => {
    initAnswer(
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
  }, [initAnswer, testSections])

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
      />
    </section>
  )
}

export default TestPaper
