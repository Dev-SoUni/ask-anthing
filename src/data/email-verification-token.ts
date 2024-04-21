import { db } from "@/lib/db"

export const getEmailVerificationTokenByEmail = async (email: string) => {
  try {
    const emailVerificationToken = await db.emailVerificationToken.findUnique({
      where: { email },
    })

    return emailVerificationToken
  }
  catch {
    return null
  }
}

export const getEmailVerificationTokenByToken = async (token: string) => {
  try {
    const emailVerificationToken = await db.emailVerificationToken.findUnique({
      where: { token },
    })

    return emailVerificationToken
  }
  catch {
    return null
  }
}
