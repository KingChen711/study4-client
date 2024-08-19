"use client"

import React, { useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { signInSchema, type TSignInSchema } from "@/lib/validation/auth"
import { signIn } from "@/actions/auth/sign-in"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function SignInForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(values: TSignInSchema) {
    if (isPending) return

    startTransition(async () => {
      const result = await signIn(values)

      if (result.isSuccess) {
        router.push("/")
        router.refresh()
        return
      }

      if (result.typeError === "base") {
        toast.error(result.messageError)
        return
      }

      const fieldErrors = result.fieldErrors
      const keys = Object.keys(fieldErrors) as (keyof TSignInSchema)[]
      keys.forEach((key) => form.setError(key, { message: fieldErrors[key] }))
      form.setFocus(keys[0])
    })
  }

  return (
    <div className="flex w-full max-w-[350px] flex-col items-center gap-y-4 rounded-xl bg-muted p-6">
      <div className="text-xl font-bold">Sign In</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="password"
                    placeholder="Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            Submit
            {isPending && <Loader2 className="ml-1 size-4 animate-spin" />}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm">
          Do not have an account?
          <Link href="/sign-up" className="font-bold hover:underline">
            Sign Up
          </Link>
        </div>
        <Button variant="link" size="sm" asChild className="">
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignInForm
