import React from "react"
import Link from "next/link"
import { Check, ChevronsUpDown, LightbulbIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Icons } from "@/components/ui/icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const timeItems = [
  {
    label: "3 ngày gần nhất",
    value: "3D",
  },
  {
    label: "7 ngày gần nhất",
    value: "7D",
  },
  {
    label: "30 ngày",
    value: "1M",
  },
  {
    label: "60 ngày",
    value: "2M",
  },
  {
    label: "90 ngày",
    value: "3M",
  },
  {
    label: "6 tháng",
    value: "6T",
  },
  {
    label: "1 năm",
    value: "1Y",
  },
]

type Props = {
  searchParams: {
    qDays?: string
  }
}

function AnalyticsPage({ searchParams }: Props) {
  const { qDays = "3D" } = searchParams

  return (
    <div>
      <h2 className="mb-4 mt-8 text-3xl font-bold">
        Thống kê kết quả luyện thi
      </h2>
      <Alert className="h-fit w-full border-success">
        <LightbulbIcon className="size-4 stroke-success" />
        <AlertTitle className="font-semibold text-success">
          Pro tips:
        </AlertTitle>
        <AlertDescription className="font-medium text-success">
          Mặc định trang thống kê sẽ hiển thị các bài làm trong khoảng thời gian
          30 ngày gần nhất, để xem kết quả trong khoảng thời gian xa hơn bạn
          chọn ở phần dropdown dưới đây.
        </AlertDescription>
      </Alert>

      <h2 className="mb-2 mt-4">
        Lọc kết quả theo ngày (tính từ bài thi cuối):
      </h2>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >
            {qDays
              ? timeItems.find((item) => item.value === qDays)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {timeItems.map((item) => (
                  <CommandItem key={item.value} value={item.value} asChild>
                    <Link href={`/analytics?qDays=${item.value}`}>
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          qDays === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Test className="size-6" />
          <div className="mt-1 font-bold text-neutral-600">Số đề đã làm</div>
          <div className="text-lg font-bold">3</div>
          <div>đề thi</div>
        </div>
        <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Time className="size-6" />
          <div className="mt-1 font-bold text-neutral-600">
            Thời gian luyện thi
          </div>
          <div className="text-lg font-bold">179</div>
          <div>phút</div>
        </div>
        <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Calendar className="size-6" />
          <div className="mt-1 font-bold text-neutral-600">Ngày dự thi</div>
          <div className="text-lg font-bold">20/09/2024</div>
          <div></div>
        </div>
        <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.ToTestDate className="size-6" />
          <div className="mt-1 font-bold text-neutral-600">Tới kỳ thi</div>
          <div className="text-lg font-bold">4</div>
          <div>ngày</div>
        </div>
        <div className="flex min-w-48 flex-1 flex-col items-center justify-center rounded-xl border bg-card p-4 shadow-lg">
          <Icons.Target2 className="size-6" />
          <div className="mt-1 font-bold text-neutral-600">Điểm mục tiêu</div>
          <div className="text-lg font-bold">7.5</div>
          <div>điểm</div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
