import React, { useEffect, useRef, useState } from "react"
import { LayoutList } from "lucide-react"

import { cn } from "@/lib/utils"

import { type CallLayoutType } from "./meeting-room"

type Props = {
  setLayout: (value: CallLayoutType) => void
  layout: CallLayoutType
}

function ChangeLayoutDropdown({ setLayout, layout }: Props) {
  const [openDropdownLayout, setOpenDropdownLayout] = useState(false)
  const dropdownLayoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function handleClickOutside(event: MouseEvent): void {
    if (
      dropdownLayoutRef.current &&
      !dropdownLayoutRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownLayout(false)
    }
  }

  return (
    <div className="relative" ref={dropdownLayoutRef}>
      <div
        onClick={() => {
          setOpenDropdownLayout((prev) => !prev)
        }}
        className="flex items-center"
      >
        <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
          <LayoutList size={20} className="text-white" />
        </div>
      </div>
      <div
        className={cn(
          "absolute left-1/2 top-0 z-50 hidden -translate-x-1/2 translate-y-[calc(-100%_-_8px)] flex-col gap-y-2 rounded-3xl border border-none bg-[#19232d] p-4 shadow outline-none",
          openDropdownLayout && "flex"
        )}
      >
        {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex cursor-pointer items-center gap-x-2 text-nowrap rounded-3xl px-4 py-2 text-sm font-bold hover:bg-[#4c535b]",
              layout === item.toLowerCase() &&
                "pointer-events-none bg-[#4c535b]"
            )}
            onClick={() => {
              setLayout(item.toLowerCase() as CallLayoutType)
              setOpenDropdownLayout(false)
            }}
          >
            <input
              type="radio"
              checked={layout === item.toLowerCase()}
              className="left-0 top-0 mt-[5px]"
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChangeLayoutDropdown
