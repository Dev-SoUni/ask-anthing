import { NextResponse } from "next/server"
import { StatusCodes } from "http-status-codes"

import { auth, update } from "@/auth"
import { db } from "@/lib/db"
import { UserPatchSchema } from "@/schemas/user"

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const rawData = await request.json()
    const validatedFields = UserPatchSchema.safeParse(rawData)
    if (!validatedFields.success) {
      return new NextResponse("데이터 형식 불일치", { status: StatusCodes.BAD_REQUEST })
    }

    const session = await auth()
    if (!session || (session.user.id !== params.userId)) {
      return new NextResponse("권한 없음", { status: StatusCodes.UNAUTHORIZED })
    }

    const updatedUser = await db.user.update({
      where: { id: params.userId },
      data: {
        ...validatedFields.data,
      },
    })

    await update({
      user: {
        ...updatedUser,
      },
    })

    return new NextResponse(null, { status: StatusCodes.OK })
  }
  catch (error) {
    console.log("[PATCH][USERS_USER_ID]", error)

    return new NextResponse("알 수 없는 오류", { status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
