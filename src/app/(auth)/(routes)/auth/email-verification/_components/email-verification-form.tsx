"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import Lottie from "lottie-react"
import { Loader2 } from "lucide-react"

import { PageError } from "@/components/errors/page-error"
import { useConfettiStore } from "@/hooks/use-confetti-store"

import emailVerificationSuccessAnimationData from "../_assets/email-verification-success.json"
import Link from "next/link";

export function EmailVerificationForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const confetti = useConfettiStore()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const confirm = async () => {
      try {
        setIsLoading(true)
        setError(false)

        await axios.post("/api/email-verification-tokens/confirm", { token })
        confetti.start()
      }
      catch (error) {
        setError(true)
      }
      finally {
        setIsLoading(false)
      }
    }

    confirm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token || error) {
    return (
      <PageError
        eyebrow="400"
        title="잘못된 요청"
        description="이메일 인증을 위한 요청이 올바르지 않습니다."
        confirmButtonText="메인으로"
        confirmButtonHref="/"
      />
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Lottie
        animationData={emailVerificationSuccessAnimationData}
        loop={true}
        className="mx-auto w-[120px] h-[120px]"
      />
      <p className="mt-6 text-gray-600 text-sm text-center font-medium">
        이메일 인증에 성공했습니다.
        <br />
        기존 페이지로 돌아가서 로그인 후 서비스를 이용해주세요.
      </p>
      <div className="mt-8 flex justify-center">
        <Link
          href="/auth/login"
          className="text-sm font-semibold text-gray-900"
        >
          로그인 페이지로 <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
