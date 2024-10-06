import { z } from "zod"

export const createFlashcardSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
})

export type TCreateFlashcardSchema = z.infer<typeof createFlashcardSchema>

export const createWordSchema = z.object({
  wordText: z.string().min(1).max(100),
  definition: z.string().min(1).max(300),
  wordForm: z.string().min(1).max(100),
  wordPronunciation: z.string().max(100).optional(),
  example: z.string().max(500).optional(),
  description: z.string().max(200).optional(),
  flashcardId: z.number().int(),
  image: z.instanceof(File).optional(),
  imageUri: z.string().optional(),
})

export type TCreateWordSchema = z.infer<typeof createWordSchema>

export const updateWordSchema = z.object({
  wordText: z.string().min(1).max(100),
  definition: z.string().min(1).max(300),
  wordForm: z.string().min(1).max(100),
  wordPronunciation: z.string().max(100).optional(),
  example: z.string().max(500).optional(),
  description: z.string().max(200).optional(),
  flashcardId: z.number().int(),
  flashcardDetailId: z.number().int(),
  image: z.instanceof(File).optional(),
  imageUri: z.string().optional(),
})

export type TUpdateWordSchema = z.infer<typeof updateWordSchema>
