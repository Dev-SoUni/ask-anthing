import { NextResponse } from "next/server"
import { StatusCodes } from "http-status-codes"

import { db } from "@/lib/db"
import { getEmailVerificationTokenByToken } from "@/data/email-verification-token"
import { EmailVerificationConfirmSchema } from "@/schemas/auth"

export async function POST(
  request: Request,
) {
  try {
    const rawData = await request.json()
    const validatedFields = EmailVerificationConfirmSchema.safeParse(rawData)
    if (!validatedFields.success) {
      return new NextResponse("데이터 형식 불일치", { status: StatusCodes.BAD_REQUEST })
    }

    const { token } = validatedFields.data

    const emailVerificationToken = await getEmailVerificationTokenByToken(token)
    if (!emailVerificationToken) {
      return new NextResponse("토큰을 찾을 수 없음", { status: StatusCodes.BAD_REQUEST })
    }

    await db.user.update({
      where: {
        email: emailVerificationToken.email,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    await db.emailVerificationToken.delete({
      where: {
        id: emailVerificationToken.id,
      },
    })

    return new NextResponse(null, { status: StatusCodes.OK })
  }
  catch (error) {
    console.log("[POST][EMAIL_VERIFICATION_TOKENS_CONFIRM]", error)

    return new NextResponse("알 수 없는 오류", { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
