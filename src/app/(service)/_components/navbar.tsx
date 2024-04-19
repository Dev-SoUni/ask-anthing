import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

const menus = [
  { label: "Courses", href: "#" },
  { label: "Platform", href: "#" },
  { label: "Enterprise", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Contact", href: "#" },
]

export function Navbar() {
  return (
    <nav className="h-full flex items-center">
      <div className="container flex justify-between items-center">
        <div className="relative w-[145px] h-[30px] md:w-[155px] md:h-[40px]">
          <Image
            src="/logo.svg"
            alt="로고"
            fill
          />
        </div>

        {/* Navigation Menu */}
        <div>
          <ul className="px-8 py-3 hidden lg:flex gap-x-10 rounded-full bg-gray-100">
            {menus.map((item, idx) => (
              <li
                key={idx}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <Menu />
          </Button>
        </div>
      </div>
    </nav>
  )
}
