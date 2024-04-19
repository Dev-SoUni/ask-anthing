import React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface ProfileCardProps {
  imageSrc: string
  name: string
  location: string
  score: number
  buttonText: string
  href: string
}

export function ProfileCard({
  imageSrc,
  name,
  location,
  score,
  buttonText,
  href,
}: ProfileCardProps) {
  return (
    <div className="p-2.5 space-y-4 rounded-xl bg-[#F8F9FB]">
      <div className="relative w-full rounded-lg aspect-square overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2 py-4 rounded-lg bg-white">
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="mr-2 w-4 h-4 text-orange-500" />
            <span className="text-gray-500 text-xs font-medium">{location}</span>
          </div>
          <div>
            <span className="text-gray-800 text-2xl font-semibold">{name}</span>
          </div>
        </div>

        <Separator className="my-3" />

        <div>
          <div className="px-1 flex justify-end">
            <div className="flex items-center text-gray-500 text-sm font-medium">
              <Star className="mr-2 w-4 h-4 inline-block text-yellow-400" />
              {score}
            </div>
          </div>

          <div className="mt-2.5">
            <Button className="w-full" asChild>
              <Link href={href}>
                {buttonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
