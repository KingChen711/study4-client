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

export function objectToFormData(obj: { [key: string]: unknown }): FormData {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, JSON.stringify(obj[key]))
    }
  }

  return formData
}

export async function audioBlogUrlToFile(
  blobUrl: string,
  fileNameWithoutExt: string
): Promise<File> {
  // Fetch the Blob from the Blob URL
  const response = await fetch(blobUrl)
  const blob = await response.blob()

  // Extract MIME type to guess the file extension
  const mimeType = blob.type
  let extension = ""

  // Determine file extension based on MIME type (only handling common audio types here)
  switch (mimeType) {
    case "audio/mpeg":
      extension = ".mp3"
      break
    case "audio/wav":
      extension = ".wav"
      break
    case "audio/ogg":
      extension = ".ogg"
      break
    case "audio/aac":
      extension = ".aac"
      break
    default:
      extension = "" // If MIME type is unknown, leave it without extension
  }

  // Construct the final file name with or without an extension
  const fileName = extension
    ? `${fileNameWithoutExt}${extension}`
    : fileNameWithoutExt

  // Create a File from the Blob
  const file = new File([blob], fileName, {
    type: blob.type,
  })

  return file
}

// export function base64ToFile(base64: string): File {
//   // Extract the MIME type from the base64 string
//   const mimeType =
//     base64.match(/data:(.*?);base64/)?.[1] || "application/octet-stream"

//   // Decode the Base64 string to binary data
//   const byteString = atob(base64.split(",")[1])

//   // Create an array buffer to hold the binary data
//   const arrayBuffer = new ArrayBuffer(byteString.length)
//   const uint8Array = new Uint8Array(arrayBuffer)

//   // Fill the array buffer with binary data
//   for (let i = 0; i < byteString.length; i++) {
//     uint8Array[i] = byteString.charCodeAt(i)
//   }

//   // Create a Blob from the buffer
//   const blob = new Blob([uint8Array], { type: mimeType })

//   // Convert Blob to a File object (with default name since name is not needed)
//   return new File([blob], uuidv4(), { type: mimeType })
// }

export function base64ToFile(base64: string, fileName: string): File {
  // Split the base64 string into the data and the mime type parts
  const [header, data] = base64.split(",")
  const mimeType = header.match(/:(.*?);/)?.[1] || "audio/mpeg" // Default to 'audio/mpeg' if not found

  // Decode the base64 data
  const byteCharacters = atob(data)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)

  // Create a File from the byte array
  const file = new File([byteArray], fileName, { type: mimeType })

  return file
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64String = (reader.result as string).split(",")[1] // Exclude metadata prefix
      resolve(base64String)
    }

    reader.onerror = () => {
      reject(new Error("Error reading file."))
    }

    reader.readAsDataURL(file) // Read file as data URL
  })
}
