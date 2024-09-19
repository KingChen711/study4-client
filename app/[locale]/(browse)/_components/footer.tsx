import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"

import { Icons } from "@/components/ui/icons"

async function Footer() {
  const t = await getTranslations("Layout")
  return (
    <footer
      style={{
        backgroundImage: "url(/footer.webp)",
      }}
      className="flex flex-col border bg-auto bg-bottom bg-no-repeat px-6 py-8 max-md:pb-14 sm:px-14"
    >
      <div className="mx-auto size-full max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex w-48 flex-col gap-y-3">
            <div className="text-3xl font-bold leading-none">
              <p className="text-xl font-semibold">
                Prep4<strong className="text-primary">IELTS</strong>
              </p>
            </div>
            <p>@ 2024</p>
            <div className="flex gap-x-2">
              <Link href="#">
                <Icons.Instagram className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Twitter className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Linkedin className="size-4" />
              </Link>
              <Link href="#">
                <Icons.Tiktok className="size-4" />
              </Link>
            </div>
          </div>

          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">{t("Footer.Curriculums")}</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS General Reading
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS General Writing
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                Complete TOEIC
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS Fundamentals
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS Intensive Listening
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS Intensive Reading
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS Intensive Speaking
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                IELTS Intensive Writing
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">{t("Footer.Resources")}</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.ExamLibraries")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.Blog")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.DocumentRepositories")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.StudyGroups")}
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <h4 className="font-bold">{t("Footer.Support")}</h4>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.UsingGuide")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.BuyingGuide")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.CustomerCare")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.ComplaintResponse")}
              </p>
            </div>
            <div className="col-span-12 flex flex-col sm:col-span-6 md:col-span-3">
              <p className="font-semibold">
                Prep4<strong className="text-primary">IELTS</strong>
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.AboutUs")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.Contact")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.PrivacyPolicy")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.TermsOfUse")}
              </p>
              <p className="cursor-pointer text-sm text-muted-foreground hover:text-primary hover:underline">
                {t("Footer.TermsAndConditionsOfTrading")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">@ 2024 - {t("Footer.Copyright")}</div>
      </div>
    </footer>
  )
}

export default Footer
