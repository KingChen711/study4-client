import React from "react"
import Image from "next/image"
import banner1 from "@/assets/images/banner1.jpg"
import banner2 from "@/assets/images/banner2.jpg"
import banner3 from "@/assets/images/banner3.jpg"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

//TODO: load banner từ DB
function Hero() {
  return (
    <section className="max-sm:mx-6">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem>
            <Image
              src={banner1}
              alt="banner1"
              sizes="100%"
              className="aspect-[3/1] w-full rounded-lg object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={banner2}
              alt="banner2"
              sizes="100%"
              className="aspect-[3/1] w-full rounded-lg object-cover"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src={banner3}
              alt="banner3"
              sizes="100%"
              className="aspect-[3/1] w-full rounded-lg object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default Hero

export function HeroSkeleton() {
  return (
    <section className="max-sm:mx-6">
      <div className="w-full">
        <Skeleton className="aspect-[3/1] w-full rounded-lg" />
      </div>
    </section>
  )
}
