import React from "react"
import getPackages from "@/queries/premium/get-packages"
import whoAmI from "@/queries/users/who-am-i"

import ActiveButton from "./_components/active-button"

async function PremiumPage() {
  const currentUser = await whoAmI()

  if (currentUser?.isActive) {
    return <div>Bạn đã đăng một gói nào đó rồi</div>
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
