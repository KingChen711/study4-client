"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOverlay } from "@/stores/use-overlay"
import ReactPaginate from "react-paginate"

import { buttonVariants } from "../../components/ui/button"
import { cn, formUrlQuery } from "../../lib/utils"
import { type PagingMetaData } from "../../types/index"

type Props = {
  metadata: PagingMetaData
}

function Paginator({ metadata }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { hide, show } = useOverlay()
  const currentPage = searchParams.get("page")

  const paginate = ({ selected }: { selected: number }) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: (selected + 1).toString(),
    })
    show()
    router.push(newUrl)
  }

  useEffect(() => {
    hide()
  }, [hide, currentPage])

  return (
    <ReactPaginate
      forcePage={metadata.pageNumber - 1}
      onPageChange={paginate}
      pageCount={metadata.totalPages}
      breakClassName={buttonVariants({ variant: "ghost" })}
      containerClassName={cn("flex justify-center gap-2")}
      pageLinkClassName={buttonVariants({ variant: "outline" })}
      previousLinkClassName={buttonVariants({ variant: "link" })}
      disabledClassName={"pointer-events-none opacity-50"}
      nextLinkClassName={buttonVariants({ variant: "link" })}
      activeLinkClassName={buttonVariants()}
    />
  )
}

export default Paginator
