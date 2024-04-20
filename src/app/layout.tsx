import React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { SessionProvider } from "next-auth/react"

import { auth } from "@/auth"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const Pretendard = localFont({
  src: "../styles/fonts/Pretendard/variable/woff2/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Ask Anything",
    default: "Ask Anything",
  },
  // TODO: 언젠가는 내용 채우기
  description: "",
}

// TODO: 폰트를 Pretendard로 변경하기
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html
        lang="ko"
        className={cn(Pretendard.variable)}
      >
        <body className="font-pretendard">
          {children}
          <ConfettiProvider />
          <Toaster position="top-center" />
        </body>
      </html>
    </SessionProvider>
  )
}
