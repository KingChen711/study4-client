import { z } from "zod"

export type UserPayload = {
  id: string
  email: string
}

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
