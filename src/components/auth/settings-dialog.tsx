import React from "react"

import { auth } from "@/auth"
import { getUserById } from "@/data/user"

import { SettingsDialogContent } from "./settings-dialog-content"

export async function SettingsDialog() {
  const session = await auth()

  if (!session) return <></>

  const user = await getUserById(session.user.id)

  if (!user) return <></>

  return (
    <SettingsDialogContent user={user} />
  )
}
