import React from "react"

type Props = {
  name: string //for debug
  message?: string | null
}

function ErrorMessage({ name, message }: Props) {
  if (!message) return null

  console.log({ name, message })

  return (
    <div className="text-sm font-medium leading-none text-danger">
      {message}
    </div>
  )
}

export default ErrorMessage
