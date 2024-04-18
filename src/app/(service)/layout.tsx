import React from "react"

import { Navbar } from "./_components/navbar"

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-full">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  )
}
