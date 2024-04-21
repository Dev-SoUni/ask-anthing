"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

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
import { useConfettiStore } from "@/hooks/use-confetti-store"
import { RegisterSchema } from "@/schemas/auth"

export function RegisterForm() {
  const router = useRouter()
  const confetti = useConfettiStore()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      setIsLoading(true)
      setError(null)

      await axios.post("/api/users", values)

      confetti.start()
      toast.success("이메일 인증을 위한 메일이 발송되었습니다.\n이메일은 확인해주세요.")
      router.push("/auth/login")
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data)
        }
        else {
          setError("알 수 없는 오류가 발생했습니다.")
        }
      }
      else {
        setError("알 수 없는 오류가 발생했습니다.")
      }
    }
    finally {
      setIsLoading(false)
    }
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="이름을 입력해주세요."
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TwAlert variant="warning" message={error} />

          <div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              회원가입
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-10 text-center text-sm text-gray-500">
        이미 가입되어 있으신가요?{' '}
        <Link
          href="/auth/login"
          className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
        >
          로그인
        </Link>
      </p>
    </>
  )
}
