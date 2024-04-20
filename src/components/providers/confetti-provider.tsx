"use client"

import React from "react"
import Confetti from "react-confetti"

import { useConfettiStore } from "@/hooks/use-confetti-store"

export function ConfettiProvider() {
  const { ing, end } = useConfettiStore()

  if (!ing) return null

  return (
    <Confetti
      numberOfPieces={200}
      recycle={false}
      className="pointer-events-none z-[100]"
      onConfettiComplete={end}
    />
  )
}
