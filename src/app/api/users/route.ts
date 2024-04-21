import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { StatusCodes } from "http-status-codes"

import { db } from "@/lib/db"
import { generateEmailVerificationToken } from "@/lib/token"
import { sendEmailVerificationTokenEmail } from "@/lib/mail"
import { getUserByEmail } from "@/data/user"
import { RegisterSchema } from "@/schemas/auth"

export async function POST(
  request: Request,
) {
  try {
    const rawData = await request.json()
    const validatedFields = RegisterSchema.safeParse(rawData)
    if (!validatedFields.success) {
      return new NextResponse("데이터 형식 불일치", { status: StatusCodes.BAD_REQUEST })
    }

    const { email, name, password } = validatedFields.data

    // 이메일 중복
    const dbUser = await getUserByEmail(email)
    if (dbUser) {
      return new NextResponse("이미 사용 중인 이메일입니다.", { status: StatusCodes.BAD_REQUEST })
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10)

    //
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    const emailVerificationToken = await generateEmailVerificationToken(email)

    await sendEmailVerificationTokenEmail({
      to: emailVerificationToken.email,
      token: emailVerificationToken.token,
    })

    //
    return new NextResponse(null, { status: StatusCodes.OK })
  }
  catch (error) {
    console.log("[POST][USERS]", error)

    return new NextResponse("알 수 없는 오류", { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
