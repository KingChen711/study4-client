import { z } from "zod"

export type UserPayload = {
  id: string
  email: string
}

export type PaymentStatus = "PAID" | "EXPIRED" | "PENDING" | "CANCELLED"

export type ActionResponse<TFormSchema = undefined, TData = undefined> =
  | (TData extends undefined
      ? { isSuccess: true }
      : { isSuccess: true; data: TData })
  | { isSuccess: false; typeError: "base"; messageError: string }
  | (TFormSchema extends undefined
      ? never
      : {
          isSuccess: false
          typeError: "form"
          fieldErrors: Record<keyof TFormSchema, string>
        })

export type PagingMetaData = {
  pageNumber: number
  totalPages: number
}

export type TestType = "Listening" | "Reading" | "Speaking" | "Writing"

export const cloudResourceSchema = z.object({
  publicId: z.string().min(1),
  url: z.string().min(1),
})

export type TCloudResource = z.infer<typeof cloudResourceSchema>

export type TransactionInfo = {
  code: string
  desc: string
  data: Data
  signature: string
}

type Data = {
  id: string
  orderCode: string
  amount: number
  amountPaid: number
  amountRemaining: number
  status: string
  createdAt: string
  transactions: Transaction[]
  cancellationReason: null
  canceledAt: null
}

type Transaction = {
  reference: null
  amount: number
  accountNumber: string
  description: string
  transactionDateTime: string
  virtualAccountName: null
  virtualAccountNumber: null
  counterAccountBankId: null
  counterAccountBankName: null
  counterAccountName: null
  counterAccountNumber: null
}
