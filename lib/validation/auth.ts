import z from "zod"

export const signUpSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase().trim().min(2).max(50),
  password: z
    .string()
    .trim()
    .min(4, "Password must at least 4 characters")
    .max(20, "Password must at maximum 20 characters"),
})

export type TSignUpSchema = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
  email: z.string().email("Invalid email").toLowerCase().trim(),
  password: z.string().trim().min(1, "Password is required"),
})

export type TSignInSchema = z.infer<typeof signInSchema>
