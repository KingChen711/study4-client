import { UNKNOWN_ERROR_MESSAGE } from "@/constants"
import axios, { type AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { format, type Locale } from "date-fns"
import { StatusCodes } from "http-status-codes"
import queryString from "query-string"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDate(isoString: Date, locale: Locale): string {
  return format(isoString, "dd/MM/yyyy", { locale })
}

export function toDateTime(isoString: Date, locale: Locale): string {
  return format(isoString, "dd/MM/yyyy HH:mm", { locale })
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

type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const query = queryString.parse(params)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  query[key] = value

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query,
    },
    { skipNull: true }
  )
}

export function indexToAlphabet(num: number): string {
  return String.fromCharCode(65 + num)
}

export function convertSecondToText(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const hh = hours.toString().padStart(2, "0")
  const mm = minutes.toString().padStart(2, "0")
  const ss = remainingSeconds.toString().padStart(2, "0")

  return `${hh}:${mm}:${ss}`
}
