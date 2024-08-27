"use client"

import React, { useState } from "react"

import FullTestTab from "./full-test-tab"
import PracticeTab from "./practice-tab"
import Tabs from "./tabs"

type Props = {
  sections: string[]
}

export type TestType = "practice" | "full"

function TestTypeTabs({}: Props) {
  const [activeTab, setActiveTab] = useState<TestType>("practice")
  return (
    <div>
      <Tabs activeTab={activeTab} setActiveType={setActiveTab} />

      {activeTab === "practice" && <PracticeTab />}
      {activeTab === "full" && <FullTestTab />}
    </div>
  )
}

export default TestTypeTabs
