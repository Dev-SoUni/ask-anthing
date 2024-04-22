"use client"

import { create } from "zustand"

interface State {
  isOpen: boolean
}

interface Action {
  open: () => void
  close: () => void
}

export const useSettingsDialogStore = create<State & Action>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
