import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function TravelPage() {
  return (
    <div className="container">
      <Button variant="default" size="lg" asChild>
        <Link href="/travel/new">
          나만의 여행 만들기
        </Link>
      </Button>
    </div>
  )
}
