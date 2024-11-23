import React from "react"
import getPackages from "@/queries/premium/get-packages"
import getUserPremium from "@/queries/users/get-user-premium"

import { cn, formatePrice, toDateTime2 } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import ActiveButton from "./_components/active-button"

async function PremiumPage() {
  const premium = await getUserPremium()

  if (premium?.isPremiumActive) {
    return (
      <div className="mt-8 flex flex-col">
        <div className="mb-4 text-3xl font-bold">Premium</div>
        <div>Bạn đã đăng ký một {premium.premiumPackageName}</div>
        <div>Hết hạn {toDateTime2(premium.expireDate)}</div>
        <div className="mt-4 grid grid-cols-12 gap-6">
          <div
            className={cn(
              "col-span-12 flex flex-col rounded-3xl border px-6 py-10 shadow sm:col-span-6 xl:col-span-3",
              premium.premiumPackageId === 1 && "border-info shadow-info",
              premium.premiumPackageId === 2 && "border-warning shadow-warning",
              premium.premiumPackageId === 3 && "border-danger shadow-danger"
            )}
          >
            <p className="mb-2 mt-4 text-xl font-semibold">
              {premium.premiumPackageName}
            </p>
            <div className="mb-4 flex flex-1 flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <Icons.Check className="size-4 text-success" />
                Luyện tập làm test online
              </div>
              <div className="flex items-center gap-x-2">
                <Icons.Check className="size-4 text-success" />
                Xem đáp án
              </div>

              <div className="flex items-center gap-x-2">
                <Icons.Check className="size-4 text-success" />
                Xem giải thích đáp án
              </div>
              {premium.premiumPackageId >= 2 ? (
                <div className="flex items-center gap-x-2">
                  <Icons.Check className="size-4 text-success" />
                  Luyện tập speaking
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  <Icons.X className="size-4 text-danger" />
                  Luyện tập speaking
                </div>
              )}
              {premium.premiumPackageId >= 3 ? (
                <>
                  <div className="flex items-center gap-x-2">
                    <Icons.Check className="size-4 text-success" />
                    Làm kiểm tra flashcard
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Icons.Check className="size-4 text-success" />
                    Kiểm tra với flashcard
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-x-2">
                    <Icons.X className="size-4 text-danger" />
                    Làm kiểm tra flashcard
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Icons.X className="size-4 text-danger" />
                    Kiểm tra với flashcard
                  </div>
                </>
              )}
            </div>
            <Button variant="outline" className="hover:cursor-default">
              Gói hiện tại của bạn
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const packages = await getPackages()

  return (
    <div className="mt-8 flex flex-col">
      <div className="mb-6 text-3xl font-bold">Premium</div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-col rounded-3xl border border-success px-6 py-10 shadow shadow-success sm:col-span-6 xl:col-span-3">
          <div className="flex items-end gap-x-2">
            <div className="text-2xl font-bold">FREE</div>
          </div>
          <p className="mb-2 mt-4 text-xl font-semibold">Gói miễn phí</p>
          <div className="mb-4 flex flex-1 flex-col gap-y-2">
            <div className="flex items-center gap-x-2">
              <Icons.Check className="size-4 text-success" />
              Luyện tập làm test online
            </div>
            <div className="flex items-center gap-x-2">
              <Icons.Check className="size-4 text-success" />
              Xem đáp án
            </div>

            <div className="flex items-center gap-x-2">
              <Icons.X className="size-4 text-danger" />
              Xem giải thích đáp án
            </div>

            <div className="flex items-center gap-x-2">
              <Icons.X className="size-4 text-danger" />
              Luyện tập speaking
            </div>

            <div className="flex items-center gap-x-2">
              <Icons.X className="size-4 text-danger" />
              Làm kiểm tra flashcard
            </div>

            <div className="flex items-center gap-x-2">
              <Icons.X className="size-4 text-danger" />
              Kiểm tra với flashcard
            </div>
          </div>
          <Button variant="outline" className="hover:cursor-default">
            Gói hiện tại của bạn
          </Button>
        </div>
        {packages.map((_package, i) =>
          i !== 2 ? null : (
            <div
              className={cn(
                "col-span-12 flex flex-col rounded-3xl border px-6 py-10 shadow sm:col-span-6 xl:col-span-3",
                // i === 0 && "border-info shadow-info",
                // i === 1 && "border-warning shadow-warning",
                i === 2 && "border-danger shadow-danger"
              )}
              key={_package.premiumPackageId}
            >
              <div className="flex items-end gap-x-2">
                <div className="text-2xl font-bold">
                  đ{formatePrice(_package.price)}
                </div>{" "}
                <div className="text-base">/tháng</div>
              </div>
              <p className="mb-2 mt-4 text-xl font-semibold">
                {_package.premiumPackageName}
              </p>
              <div className="mb-4 flex flex-1 flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <Icons.Check className="size-4 text-success" />
                  Luyện tập làm test online
                </div>
                <div className="flex items-center gap-x-2">
                  <Icons.Check className="size-4 text-success" />
                  Xem đáp án
                </div>

                <div className="flex items-center gap-x-2">
                  <Icons.Check className="size-4 text-success" />
                  Xem giải thích đáp án
                </div>
                {i >= 1 ? (
                  <div className="flex items-center gap-x-2">
                    <Icons.Check className="size-4 text-success" />
                    Luyện tập speaking
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <Icons.X className="size-4 text-danger" />
                    Luyện tập speaking
                  </div>
                )}
                {i >= 2 ? (
                  <>
                    <div className="flex items-center gap-x-2">
                      <Icons.Check className="size-4 text-success" />
                      Làm kiểm tra flashcard
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Icons.Check className="size-4 text-success" />
                      Kiểm tra với flashcard
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-x-2">
                      <Icons.X className="size-4 text-danger" />
                      Làm kiểm tra flashcard
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Icons.X className="size-4 text-danger" />
                      Kiểm tra với flashcard
                    </div>
                  </>
                )}
              </div>
              <ActiveButton packageId={_package.premiumPackageId} />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PremiumPage
