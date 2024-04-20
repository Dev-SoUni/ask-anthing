import React from "react"
import type { Metadata } from "next"
import Image from "next/image"

import { LoginForm } from "./_components/login-form"

export const metadata: Metadata = {
  title: "로그인",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          src="/logo.svg"
          alt="로고"
          width={155}
          height={40}
          className="mx-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          로그인
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
