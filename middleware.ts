import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import createMiddleware from "next-intl/middleware"

import AppConfig from "./constants/config"

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  defaultLocale: AppConfig.defaultLocale,
})

const isProtectedRoute = createRouteMatcher([
  "(.*)/tests/(.*)/practice",
  "(.*)/tests/(.*)/full-test",
  "(.*)/tests/(.*)/results/(.*)",
  "(.*)/staff(.*)",
  "(.*)/analytics(.*)",
  "(.*)/speaking(.*)",
  "(.*)/premium(.*)",
  "(.*)/histories(.*)",
  "(.*)/flashcards(.*)",
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
