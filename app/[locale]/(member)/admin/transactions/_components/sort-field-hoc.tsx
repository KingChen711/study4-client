"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from "lucide-react"

type Props = {
  children: React.ReactNode
  sortField: string
  curSort: string
}

function SortFieldHoc({ children, sortField, curSort }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValue = searchParams.get("searchValue") || ""

  if (sortField === "CREATEDAT") {
    console.log({ curSort })
  }

  const handleSort = () => {
    if (curSort === "-" + sortField) {
      router.push(
        `/admin/transactions?searchValue=${searchValue}&page=1&sort=${sortField}`
      )
      return
    }

    if (curSort === sortField) {
      router.push(`/admin/transactions?searchValue=${searchValue}&page=1`)
      return
    }

    router.push(
      `/admin/transactions?searchValue=${searchValue}&page=1&sort=-${sortField}`
    )
    return
  }

  const SortIcon = () => {
    return curSort === sortField ? (
      <ChevronsUp className="ml-1 size-4 text-primary" />
    ) : curSort === `-${sortField}` ? (
      <ChevronsDown className="ml-1 size-4 text-primary" />
    ) : (
      <ChevronsUpDown className="ml-1 size-4" />
    )
  }

  return (
    <div onClick={handleSort} className="flex items-center gap-x-1">
      {children}
      <SortIcon />
    </div>
  )
}

export default SortFieldHoc
