"use server"

import { AuthError } from "next-auth"
import { z } from "zod"

import { signIn } from "@/auth"
import { generateEmailVerificationToken } from "@/lib/token"
import { sendEmailVerificationTokenEmail } from "@/lib/mail"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas/auth"

export const login = async (
  values: z.infer<typeof LoginSchema>,
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "데이터가 올바르지 않습니다." }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "해당 이메일을 찾을 수 없습니다." }
  }

  // 이메일 인증
  if (!existingUser.emailVerified) {
    const emailVerificationToken = await generateEmailVerificationToken(existingUser.email)
    await sendEmailVerificationTokenEmail({
      to: emailVerificationToken.email,
      token: emailVerificationToken.token,
    })

    return { success: "이메일을 인증하기 위해 메일을 발송했습니다.\n메일을 확인해주세요." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
  }
  catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "이메일 주소 또는 비밀번호가 올바르지 않습니다." }
        default:
          return { error: "알 수 없는 오류가 발생했습니다." }
      }
    }

    throw error
  }
}
