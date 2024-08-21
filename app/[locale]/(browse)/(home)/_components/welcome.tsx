import React from "react"
import { getTranslations } from "@/queries/i18n/get-translations"
import { currentUser } from "@clerk/nextjs/server"

import { getUsernameFromEmail } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

async function Welcome() {
  const user = await currentUser()
  const t = await getTranslations("HomePage")

  return (
    <>
      {user && (
        <h2 className="text-lg font-bold md:text-2xl">
          {t("Greeting", {
            username: getUsernameFromEmail(
              user?.primaryEmailAddress?.emailAddress!
            ),
          })}
        </h2>
      )}
    </>
  )
}

export default Welcome

export function WelcomeSkeleton() {
  return <Skeleton className="h-8 w-[500px] max-w-full" />
}
