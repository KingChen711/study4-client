import React from "react"
import Image from "next/image"
import banner1 from "@/assets/images/banner1.jpg"
import banner2 from "@/assets/images/banner2.jpg"
import banner3 from "@/assets/images/banner3.jpg"
import { currentUser } from "@clerk/nextjs/server"

import { getUsernameFromEmail } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

async function Welcome() {
  const user = await currentUser()

  return (
    <section className="my-6 flex flex-col gap-y-6">
      {user && (
        <h2 className="text-2xl font-bold">
          Chào mừng{" "}
          {getUsernameFromEmail(user?.primaryEmailAddress?.emailAddress!)} trở
          lại!
        </h2>
      )}
      {/* TODO: Call banners from db */}
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <Image
              src={banner1}
              alt="banner1"
              sizes="100%"
              className="h-[400px] w-full rounded-lg object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={banner2}
              alt="banner2"
              sizes="100%"
              className="h-[400px] w-full rounded-lg object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={banner3}
              alt="banner3"
              sizes="100%"
              className="h-[400px] w-full rounded-lg object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default Welcome
