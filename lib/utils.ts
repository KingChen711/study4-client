import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import axios, { type AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { StatusCodes } from "http-status-codes"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type BaseErrorResponse = {
  statusCode: number
  message: string
}

export function isFormError<T>(
  error: unknown
): error is AxiosError<{ errors: T }> {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY
  )
}

export function isBaseError(
  error: unknown
): error is AxiosError<BaseErrorResponse> {
  return (
    axios.isAxiosError(error) &&
    error.response?.status !== StatusCodes.UNPROCESSABLE_ENTITY
  )
}

export function getErrorResult<TFormSchema = undefined>(
  error: unknown
):
  | { typeError: "base"; messageError: string; isSuccess: false }
  | (TFormSchema extends undefined
      ? never
      : {
          typeError: "form"
          fieldErrors: Record<keyof TFormSchema, string>
          isSuccess: false
        }) {
  if (isFormError<Record<keyof TFormSchema, string>>(error)) {
    return {
      typeError: "form",
      fieldErrors:
        error.response?.data.errors ||
        ({} as Record<keyof TFormSchema, string>),
      isSuccess: false,
    } as TFormSchema extends undefined
      ? never
      : {
          isSuccess: false
          typeError: "form"
          fieldErrors: Record<keyof TFormSchema, string>
        }
  }

  let messageError = ""
  if (
    !isBaseError(error) ||
    error.status === StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    messageError = UNKNOWN_ERROR_MESSAGE
  } else {
    messageError = error.response?.data.message || UNKNOWN_ERROR_MESSAGE
  }

  return { isSuccess: false, typeError: "base", messageError }
}

export function getUsernameFromEmail(email: string) {
  const [namePart] = email.split("@")
  const name = namePart.toLocaleLowerCase()
  return name
}
