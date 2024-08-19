// //không dùng use server bởi vì TicketHubAPI cần set token cho client

// import { type ActionResponse } from "@/types"

// import study4Api from "@/lib/study-4-api"
// import { getErrorResult } from "@/lib/utils"
// import { type TSignUpSchema } from "@/lib/validation/auth"

// export const signUp = async (
//   body: TSignUpSchema
// ): Promise<ActionResponse<TSignUpSchema, { token: string }>> => {
//   try {
//     const { data: token } = await study4Api().post<string>(
//       "/api/users/sign-up",
//       body
//     )

//     if (!token) throw Error()

//     return { isSuccess: true, data: { token } }
//   } catch (error) {
//     return getErrorResult<TSignUpSchema>(error)
//   }
// }
