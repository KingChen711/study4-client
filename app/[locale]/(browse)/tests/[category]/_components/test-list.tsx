import React from "react"

async function TestList() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return <div>TestList</div>
}

export default TestList
