import type { Metadata } from "next"

import { ProfileCard } from "@/components/profile-card"

export const metadata: Metadata = {
  title: "HOME",
}

export default function Home() {
  return (
    <>
      <div className="container">
        <div>
          <h2 className="mb-6 text-xl font-bold">오늘의 소개</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProfileCard
                key={idx}
                imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                location="디즈니 월드"
                name="프린스 찰스"
                score={4.8}
                buttonText="심사하기"
                href="#"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
