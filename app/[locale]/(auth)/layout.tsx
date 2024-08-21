import { Suspense } from "react"

import { Icons } from "@/components/ui/icons"

import Logo from "./_components/logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="hidden-scrollbar flex min-h-dvh flex-col items-center justify-center gap-y-6 bg-background px-6 py-8">
      <Logo />
      <Suspense fallback={<Icons.Loader className="size-14" />}>
        {children}
      </Suspense>
    </main>
  )
}
