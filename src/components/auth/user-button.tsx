"use client"

import React from "react"
import { signOut } from "next-auth/react"
import { FaUser } from "react-icons/fa"
import { LogOut, User } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSettingsDialogStore } from "@/hooks/use-settings-dialog-store"

export function UserButton() {
  const settingsDialogStore = useSettingsDialogStore()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage />
            <AvatarFallback className="text-white bg-gray-200">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => settingsDialogStore.open()}>
              <User className="mr-2 w-4 h-4" />
              <span className="text-sm">MY 프로필</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 w-4 h-4" />
              <span className="text-sm">로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
