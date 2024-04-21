import NextAuth from "next-auth"

import authConfig from "@/auth.config"

const {
  auth: middleware,
} = NextAuth(authConfig)

export default middleware((req) => {
  const { nextUrl } = req

  console.log("[MIDDLEWARE]", nextUrl.pathname)
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
