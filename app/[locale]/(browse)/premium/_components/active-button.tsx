"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { createPayment } from "@/actions/payment/create-payment"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  packageId: number
}

function ActiveButton({ packageId }: Props) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreatePayment = () => {
    startTransition(async () => {
      const res = await createPayment(packageId)

      if (res.isSuccess) {
        router.push(res.data.paymentUrl)
        return
      }

      toast(res.messageError)
    })
  }

  return (
    <Button onClick={handleCreatePayment} disabled={pending}>
      Nâng cấp ngay {pending && <Icons.Loader className="ml-1 size-4" />}
    </Button>
  )
}

export default ActiveButton
