import React from "react"

import { Navbar } from "./_components/navbar"

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-full">
      <div className="h-[100px] lg:h-[150px]">
        <Navbar />
      </div>

      <main className="pt-8">
        {children}
      </main>
    </div>
  )
}
