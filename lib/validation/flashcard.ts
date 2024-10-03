import { z } from "zod"

export const createFlashcardSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
})

export type TCreateFlashcardSchema = z.infer<typeof createFlashcardSchema>
