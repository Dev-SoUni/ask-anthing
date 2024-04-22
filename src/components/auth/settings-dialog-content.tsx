"use client"

import React from "react"
import { toast } from "sonner"
import { Loader2, Scroll, UserIcon } from "lucide-react"
import { FaUser } from "react-icons/fa"
import type { User } from "@prisma/client"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { SettingsNameButton } from "@/components/auth/settings-name-button"
import { useSettingsDialogStore } from "@/hooks/use-settings-dialog-store"

const sidebarLinks = [
  { label: "계정", icon: UserIcon, value: "account" },
  { label: "활동", icon: Scroll, value: "activity" },
]

interface SettingsDialogProps {
  user: User
}

export function SettingsDialogContent({
  user,
}: SettingsDialogProps) {
  const { isOpen, close } = useSettingsDialogStore()

  const handleOpenChange = (value: boolean) => {
    if (!value) close()
  }

  const handleAvatarClick = () => {
    toast.warning("서비스를 준비 중입니다.")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95%] lg:w-full max-w-4xl rounded-lg">
        <Tabs
          defaultValue={sidebarLinks[0].value}
          orientation="vertical"
        >
          <div className="grid grid-cols-6 gap-x-6 gap-y-4 lg:gap-y-0">
            <div className="col-span-2">
              <TabsList className="lg:w-full lg:h-auto lg:flex-col lg:gap-y-0.5">
                {sidebarLinks.map((({ label, icon: Icon, value }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="lg:py-2 lg:w-full justify-start"
                  >
                    <Icon className="mr-2 w-4 h-4" />
                    <span>{label}</span>
                  </TabsTrigger>
                )))}
              </TabsList>
            </div>
            <div className="col-span-6 lg:col-span-4">
              <TabsContent value="account">
                {!user && (
                  <div className="py-6 flex justify-center">
                    <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
                  </div>
                )}
                {user && (
                  <>
                    <div>
                      <h6 className="text-2xl font-bold">계정</h6>
                      <p className="mt-1 text-muted-foreground text-sm">계정 정보 관리</p>
                    </div>
                    <Separator className="my-6" />
                    <div>
                      <div className="flex justify-center">
                        <Avatar
                          className="cursor-pointer w-[100px] h-[100px]"
                          onClick={handleAvatarClick}
                        >
                          <AvatarImage src="" alt="" />
                          <AvatarFallback className="text-white bg-gray-200">
                            <FaUser size={40} />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="mt-4 flex justify-center">
                        <SettingsNameButton user={user} />
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="activity">
                <div>
                  <h6 className="text-2xl font-bold">활동</h6>
                  <p className="mt-1 text-muted-foreground text-sm">활동 내역 관리</p>
                </div>
                <Separator className="my-6" />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
