import Image from "next/image"

import { cn } from "@/lib/utils"

type Props = {
  mobile?: boolean
}

function Logo({ mobile = false }: Props) {
  return (
    <div className="flex items-center gap-x-1 lg:px-5">
      <Image
        alt="logo"
        src="/logo_sm.webp"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div
        className={cn(
          "text-2xl font-bold max-sm:hidden",
          mobile && "max-sm:block"
        )}
      >
        Prep4<strong className="text-primary">IELTS</strong>
      </div>
    </div>
  )
}

export default Logo
