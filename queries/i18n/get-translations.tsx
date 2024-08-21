import { cache } from "react"
import { getTranslations as libGetTranslations } from "next-intl/server"

const customGetTranslations = cache(libGetTranslations)

export { customGetTranslations as getTranslations }
