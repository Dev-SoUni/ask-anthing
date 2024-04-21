import React from "react"
import Link from "next/link"

interface PageErrorProps {
  eyebrow?: string
  title: string
  description: string
  confirmButtonText?: string
  confirmButtonHref?: string
}

/**
 * 해당 컴포넌트는 페이지 전체 기준으로 보여집니다.
 * 유의해서 사용해주세요!
 *
 * 참고 : https://tailwindui.com/components/marketing/feedback/404-pages
 */
export function PageError({
  eyebrow,
  title,
  description,
  confirmButtonText,
  confirmButtonHref,
}: PageErrorProps) {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {(confirmButtonText && confirmButtonHref) && (
            <Link
              href={confirmButtonHref}
              className="text-sm font-semibold text-gray-900"
            >
              {confirmButtonText} <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
