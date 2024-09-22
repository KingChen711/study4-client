import React from "react"
import getPackages from "@/queries/premium/get-packages"
import getUserPremium from "@/queries/users/get-user-premium"

import { toDateTime2 } from "@/lib/utils"

import ActiveButton from "./_components/active-button"

async function PremiumPage() {
  const premium = await getUserPremium()

  console.log({ premium })

  if (premium?.isPremiumActive) {
    return (
      <div>
        <div>Bạn đã đăng một gói {premium.premiumPackageName}</div>
        <div>Hết hạn {toDateTime2(premium.expireDate)}</div>
      </div>
    )
  }

  const packages = await getPackages()

  return (
    <div className="flex flex-col">
      <div>Premium Page</div>

      <div className="flex flex-wrap gap-8">
        {packages.map((_package) => (
          <div
            className="flex flex-col items-center gap-y-4 rounded-xl border p-6 shadow"
            key={_package.premiumPackageId}
          >
            <p className="font-bold"> {_package.premiumPackageName}</p>
            <p>
              đ{_package.price}/{_package.durationInMonths} tháng
            </p>
            <ActiveButton packageId={_package.premiumPackageId} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PremiumPage
