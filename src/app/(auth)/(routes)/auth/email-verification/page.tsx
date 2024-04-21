import React from "react"
import type { Metadata } from "next"

import { EmailVerificationForm } from "./_components/email-verification-form"

export const metadata: Metadata = {
  title: "이메일 인증",
}

export default function EmailVerificationPage() {
  return (
    <main className="h-full">
      <div className="h-full flex justify-center items-center">
        <EmailVerificationForm />
      </div>
    </main>
  )
}
