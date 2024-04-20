"use client"

import { create } from "zustand"

interface State {
  ing: boolean
}

interface Action {
  start: () => void
  end: () => void
}

export const useConfettiStore = create<State & Action>((set) => ({
  ing: false,

  start: () => set({ ing: true }),
  end: () => set({ ing: false }),
}))
