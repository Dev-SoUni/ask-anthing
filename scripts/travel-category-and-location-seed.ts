import { Prisma,  PrismaClient } from "@prisma/client"

const db = new PrismaClient()

interface DataItem extends Omit<Prisma.TravelCategoryCreateArgs["data"], "locations"> {
  locations: Omit<Prisma.TravelLocationCreateArgs["data"], "categoryId">[]
}

const data: DataItem[] = [
  {
    name: "국내",
    locations: [
      { name: "가평·양평" },
      { name: "강릉·속초" },
      { name: "경주" },
      { name: "부산" },
      { name: "여수" },
      { name: "순천" },
      { name: "인천" },
      { name: "전주" },
      { name: "군산" },
      { name: "제주" },
      { name: "춘천" },
      { name: "홍천" },
      { name: "태안" },
      { name: "통영·거제·남해" },
      { name: "포항·안동" },
    ],
  },
  {
    name: "일본",
    locations: [
      { name: "도쿄" },
      { name: "후쿠오카" },
      { name: "오사카" },
      { name: "가고시마" },
      { name: "시즈오카" },
      { name: "나고야" },
      { name: "삿포로" },
      { name: "오키나와" },
      { name: "나가사키" },
      { name: "다카마쓰" },
    ],
  },
  {
    name: "동남아시아",
    locations: [
      { name: "나트랑" },
      { name: "마닐라" },
      { name: "미얀마" },
      { name: "치앙마이" },
      { name: "팔라완" },
      { name: "푸꾸옥" },
      { name: "라오스" },
      { name: "쿠알라룸푸르" },
      { name: "달랏" },
      { name: "다낭" },
      { name: "방콕" },
      { name: "세부" },
      { name: "코타키나발루" },
      { name: "싱가포르" },
      { name: "하노이" },
      { name: "호치민" },
      { name: "발리" },
      { name: "푸켓" },
      { name: "보라카이" },
    ],
  },
  {
    name: "남태평양",
    locations: [
      { name: "시드니" },
      { name: "멜버른" },
      { name: "괌" },
      { name: "사이판" },
    ],
  },
  {
    name: "유럽",
    locations: [
      { name: "그라나다" },
      { name: "두브로브니크" },
      { name: "리스본" },
      { name: "밀라노" },
      { name: "브뤼셀" },
      { name: "세비야" },
      { name: "자그레브" },
      { name: "포르투" },
      { name: "헬싱키" },
      { name: "아테네" },
      { name: "파리" },
      { name: "프라하" },
      { name: "로마" },
      { name: "런던" },
      { name: "바르셀로나" },
      { name: "빈" },
      { name: "피렌체" },
      { name: "인터라켄" },
      { name: "마드리드" },
      { name: "부다페스트" },
      { name: "블라디보스토크" },
      { name: "취리히" },
      { name: "프랑크푸르트" },
      { name: "뮌헨" },
      { name: "암스테르담" },
      { name: "베를린" },
    ],
  },
  {
    name: "미주",
    locations: [
      { name: "밴쿠버" },
      { name: "샌프란시스코" },
      { name: "시애틀" },
      { name: "토론토" },
      { name: "하와이" },
      { name: "뉴욕" },
      { name: "로스앤젤레스" },
    ],
  },
  {
    name: "중남미",
    locations: [
      { name: "칸쿤" },
    ],
  },
  {
    name: "서아시아",
    locations: [
      { name: "두바이" },
      { name: "이스탄불" },
      { name: "카파도키아" },
    ],
  },
  {
    name: "중화/중국",
    locations: [
      { name: "가오슝" },
      { name: "칭다오" },
      { name: "하이난" },
      { name: "홍콩" },
      { name: "타이베이" },
      { name: "상하이" },
      { name: "베이징" },
    ],
  },
]

async function main() {
  for (let i = 0; i < data.length; i++) {
    const row = await db.travelCategory.upsert({
      where: {
        name: data[i].name,
      },
      update: {
        name: data[i].name,
      },
      create: {
        name: data[i].name,
      },
    })

    for (let j = 0; j < data[i].locations.length; j++) {
      await db.travelLocation.upsert({
        where: {
          name: data[i].locations[j].name,
        },
        update: {
          name: data[i].locations[j].name,
        },
        create: {
          categoryId: row.id,
          name: data[i].locations[j].name,
        },
      })
    }
  }

  console.log("여행 카테고리·도시 데이터가 성공적으로 시드되었습니다.")
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (error) => {
    console.log("여행 카테고리·도시 데이터를 시드하는 중 문제가 발생했습니다.", error)
    await db.$disconnect()
    process.exit(1)
  })
