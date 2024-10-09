import React from "react"

type Props = {
  children: React.ReactNode
}

function DoTestLayout({ children }: Props) {
  return <>{children}</>
}

export default DoTestLayout
