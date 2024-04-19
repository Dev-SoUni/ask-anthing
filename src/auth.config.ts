import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas/auth"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (!validatedFields.success) return null

        const { email, password } = validatedFields.data

        const user = await getUserByEmail(email)
        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return null

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
