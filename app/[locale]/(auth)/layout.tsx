import { Suspense } from "react"
import { Loader } from "lucide-react"

import Logo from "./_components/logo"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="hidden-scrollbar flex min-h-dvh flex-col items-center justify-center gap-y-6 bg-background px-6 py-8">
      <Logo />
      {/* <Suspense fallback={<Loader className="size-8 animate-spin" />}>
        {children}
      </Suspense> */}
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </main>
  )
}
