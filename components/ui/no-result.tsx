import React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Button } from "./button"

type Props = {
  title: string
  description?: string
  className?: string
  href?: string
  linkTitle?: string
}

function NoResult({ title, description, className, href, linkTitle }: Props) {
  return (
    <div
      className={cn(
        "mt-10 flex w-full flex-col items-center justify-center",
        className
      )}
    >
      <Image
        src="/no-result.png"
        alt="no result"
        width={270}
        height={270}
        className="object-contain"
      />
      <h2 className="text-[24px] font-bold leading-[31.2px]">{title}</h2>
      <p className="my-3.5 max-w-md text-center">{description}</p>

      {href && (
        <Link href={href}>
          <Button className="min-h-[46px] rounded-lg bg-primary px-4 py-3 text-white hover:bg-primary dark:bg-primary">
            {linkTitle}
          </Button>
        </Link>
      )}
    </div>
  )
}

export default NoResult
