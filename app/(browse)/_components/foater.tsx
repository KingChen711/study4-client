import React from "react"
import Link from "next/link"

import { Icons } from "@/components/ui/icons"

function Footer() {
  return (
    <footer
      style={{
        backgroundImage: "url(/footer.webp)",
      }}
      className="z-20 flex flex-col border bg-auto bg-bottom bg-no-repeat px-6 py-8 max-md:pb-14 sm:px-14"
    >
      <div className="mx-auto size-full max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex w-48 flex-col gap-y-3">
            <div className="text-3xl font-bold leading-none">STUDY4</div>
            <p>@ 2024</p>
            <div className="flex gap-x-2">
              <Link href="#">
                <Icons.Instagram className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Twitter className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Linkedin className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Tiktok className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">Chương trình học</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS General Reading
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS General Writing
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Complete TOEIC
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS Fundamentals
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS Intensive Listening
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS Intensive Reading
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS Intensive Speaking
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                IELTS Intensive Writing
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">Tài nguyên</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Thư viện đề thi
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Blog
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Kho tài liệu
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Nhóm học tập
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">Hỗ trợ</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Hướng dẫn sử dụng
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Hướng dẫn mua hàng
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Chăm sóc khách hàng
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Phản hồi khiếu nại
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">STUDY4</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Về chúng tôi
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Liên hệ
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Điều khoản bảo mật
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Điều khoản sử dụng
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
                Điều khoản và Điều Kiện Giao Dịch
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          @ 2024 - Bản quyền của ChicChoice💘.
        </div>
      </div>
    </footer>
  )
}

export default Footer
