import { v4 as uuid } from "uuid"

import { db } from "@/lib/db"
import { getEmailVerificationTokenByEmail } from "@/data/email-verification-token"

export const generateEmailVerificationToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 1000 * 60 * 5) // 5분

  const existingEmailVerificationToken = await getEmailVerificationTokenByEmail(email)
  if (existingEmailVerificationToken) {
    await db.emailVerificationToken.delete({
      where: { id: existingEmailVerificationToken.id },
    })
  }

  const emailVerificationToken = await db.emailVerificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return emailVerificationToken
}
