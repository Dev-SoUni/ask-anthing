"use client"

import React, { useState, useTransition } from "react"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TwAlert } from "@/components/ui/tw-alert"
import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas/auth"

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState<string | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    setSuccess(undefined)
    setError(undefined)

    startTransition(async () => {
      try {
        const response = await login(values)
        setSuccess(response?.success)
        setError(response?.error)
      }
      catch {
        setError("알 수 없는 오류가 발생했습니다.")
      }
    })
  })

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일 주소</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="이메일 주소를 입력해주세요."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TwAlert variant="info" message={success} />
          <TwAlert variant="warning" message={error} />

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              로그인
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-10 text-center text-sm text-gray-500">
        아직 회원이 아니신가요?{' '}
        <Link
          href="/auth/register"
          className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
        >
          회원가입
        </Link>
      </p>
    </>
  )
}
