"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Pencil } from "lucide-react"
import type { User } from "@prisma/client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

interface SettingsNameButtonProps {
  user: User
}

const FormSchema = z.object({
  name: z.string()
    .min(1, { message: "이름은 필수 사항입니다." }),
})

export function SettingsNameButton({
  user,
}: SettingsNameButtonProps) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name:"",
    },
  })

  useEffect(() => {
    if (isEditing) {
      form.setValue("name", user.name || "")
    }
  }, [form, isEditing])

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/users/${user.id}`, values)
      setIsEditing(false)
      toast.success("회원 정보가 수정되었습니다.")
      router.refresh()
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data)
        }
        else {
          toast.error("알 수 없는 오류가 발생했습니다.")
        }
      }
      else {
        toast.error("알 수 없는 오류가 발생했습니다.")
      }
    }
    finally {
      setIsLoading(false)
    }
  })

  return (
    <>
      {!isEditing && (
        <Button
          variant="ghost"
          size="lg"
          className="font-medium"
          onClick={() => setIsEditing(true)}
        >
          <span>{user.name}</span>
          <Pencil className="ml-4 w-4 h-4" />
        </Button>
      )}
      {isEditing && (
        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
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
              </div>
              <div className="mt-2 flex gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                  className="w-full"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="w-full"
                  disabled={isLoading}
                >
                  저장
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  )
}
