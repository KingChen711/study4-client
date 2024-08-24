import React from "react"

type Props = {
  params: {
    testId: string
  }
}

function TestDetailPage({ params }: Props) {
  const { testId } = params

  console.log({ testId })

  return <div>TestDetailPage</div>
}

export default TestDetailPage
