"use client"

import React, { useEffect, useState } from "react"
import { type PracticeTest } from "@/queries/test/get-practice-test"
import { useHighlightQuestion } from "@/stores/use-hightlight-question"
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

  const [activeSection, setActiveSection] = useState<number>(
    testSections[0].testSectionId
  )

  function handleClickSection(sectionId: number) {
    setActiveSection(sectionId)
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
              sectionId: ts.testSectionId,
              selectedAnswer: "",
            }
          })
        )
      )
    )
  }, [initAnswer, testSections])

  useEffect(() => {
    if (!highlightedQuestion) return
    setActiveSection(highlightedQuestion.sectionId)
  }, [highlightedQuestion])

  return (
    <section className="flex flex-1 flex-col gap-y-6 rounded-lg border bg-card p-4">
      <SectionTabs
        sections={testSections}
        activeSection={activeSection}
        onClickSection={handleClickSection}
      />
      <SectionContent
        section={testSections.find((s) => s.testSectionId === activeSection)!}
      />
    </section>
  )
}

export default TestPaper
