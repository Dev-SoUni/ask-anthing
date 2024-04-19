import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getAccountByUserId } from "@/data/account"
import { db } from "@/lib/db"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      const existingAccount = await getAccountByUserId(existingUser.id)

      token.email = existingUser.email;
      token.name = existingUser.name;
      token.isOAuth = !!existingAccount;

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})
