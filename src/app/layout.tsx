import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Ask Anything",
    default: "Ask Anything",
  },
  // TODO: 언젠가는 내용 채우기
  description: "",
}

// TODO: 폰트를 Pretendard로 변경하기
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
