import z from "zod"

export const uploadImageSchema = z.object({
  //TODO: Speaking and Writing in future
  testType: z.enum(["Listening", "Reading"]),
  testTitle: z.string(),
})

export type TUploadImageSchema = z.infer<typeof uploadImageSchema>
