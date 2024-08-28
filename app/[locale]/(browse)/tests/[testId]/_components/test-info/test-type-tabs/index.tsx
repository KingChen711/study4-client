"use client"

import React, { useState } from "react"
import { type TestSection } from "@/queries/test/get-test"

import FullTestTab from "./full-test-tab"
import PracticeTab from "./practice-tab"
import Tabs from "./tabs"

type Props = {
  sections: TestSection[]
  testId: number
}

export type TestType = "practice" | "full"

function TestTypeTabs({ sections, testId }: Props) {
  const [activeTab, setActiveTab] = useState<TestType>("practice")

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveType={setActiveTab} />

      {activeTab === "practice" && (
        <PracticeTab testId={testId} sections={sections} />
      )}
      {activeTab === "full" && <FullTestTab />}
    </div>
  )
}

export default TestTypeTabs
