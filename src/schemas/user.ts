import { z } from "zod"

export const UserPatchSchema = z.object({
  name: z.string()
    .min(1, { message: "이름은 필수 사항입니다." })
    .optional(),
  password: z.string()
    .min(8, { message: "비밀번호는 최소 8자 이상입니다." })
    .max(16, { message: "비밀번호는 최대 16자 이하입니다." })
    .optional(),
  image: z.string()
    .optional(),
})
