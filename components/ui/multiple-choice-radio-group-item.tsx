import React from "react"

import { cn } from "@/lib/utils"

import { RadioGroupItem } from "./radio-group"

type Props = {
  checked: boolean
  disabled?: boolean
  value: string
  id?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function MultipleChoiceRadioGroupItem({
  checked,
  disabled,
  id,
  value,
  className,
  onClick,
}: Props) {
  return (
    <label>
      <div
        className={cn(
          "flex aspect-square size-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral-200 p-1 text-sm font-medium uppercase",
          checked && "bg-primary text-primary-foreground",
          className
        )}
      >
        {value}
      </div>
      <RadioGroupItem
        disabled={disabled}
        checked={checked}
        value={value}
        id={id}
        onClick={onClick}
        className="hidden"
      />
    </label>
  )
}

export default MultipleChoiceRadioGroupItem
