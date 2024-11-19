"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDebounce } from "@reactuses/core"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

type Props = {
  search: string
  placeholder: string
  status: "active" | "inactive"
}

function SearchForm({ search, placeholder, status }: Props) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(search)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // sync "search" on url to "search" state, don't do the opposite
    setSearchTerm(search)
  }, [search])

  useEffect(() => {
    console.log("wtf")

    const handleSearch = () => {
      router.push(
        `/admin/users?page=1&term=${debouncedSearchTerm}&status=${status}`
      )
    }

    if (mounted) {
      console.log("wtf2")
      // This technique prevent the handleSearch active when use come with first load
      handleSearch()
      return
    }

    setMounted(true)
  }, [debouncedSearchTerm, router, search, status])

  return (
    <div className="flex max-w-md flex-1 items-center rounded-lg border-2 px-2">
      <Search className="size-6" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchForm
