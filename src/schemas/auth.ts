import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string()
    .email({ message: "이메일 주소가 올바르지 않습니다." }),
  password: z.string()
    .min(1, '비밀번호는 필수 사항입니다.'),
})

export const RegisterSchema = z.object({
  email: z.string()
    .email({ message: "이메일 주소가 올바르지 않습니다." }),
  name: z.string()
    .min(1, { message: "이름은 필수 사항입니다." }),
  password: z.string()
    .min(8, { message: "비밀번호는 최소 8자 이상입니다." })
    .max(16, { message: "비밀번호는 최대 16자 이하입니다." }),
  confirmPassword: z.string()
    .min(1, { message: "비밀번호 확인은 필수 사항입니다." }),
})
  .refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
      path: ["confirmPassword"],
      message: "비밀번호가 서로 일치하지 않습니다.",
    },
  )
