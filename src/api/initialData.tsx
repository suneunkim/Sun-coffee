import { db } from "@/firebase";
import { collection, doc, writeBatch } from "firebase/firestore";

type Category = "coffee" | "non-coffee" | "food";

type Product = {
  name: string;
  description: string;
  price: string;
  imageURL: string;
  category: Category;
  createdAt: Date;
};

const initialDataUpload = async (products: Product[]) => {
  const batch = writeBatch(db);
  const productsRef = collection(db, "products");
  try {
    products.forEach((product: Product) => {
      const docRef = doc(productsRef, product.name);
      batch.set(docRef, product);
    });
    await batch.commit();
  } catch (error) {
    console.error("업로드 오류 발생", error);
  }
};

// const initailCoffee: Product[] = [
//   {
//     name: '아메리카노',
//     description:
//       '구운 견과류의 고소한 향미와 다크초콜렛의 깊고 깔끔한 애프터테이스트가 특징인 커피',
//     price: '3200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320805422.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 아메리카노',
//     description:
//       '구운 견과류의 고소한 향미와 다크초콜렛의 깊고 깔끔한 애프터테이스트가 특징인 커피',
//     price: '3200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1671581625569.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '카페 라떼',
//     description:
//       '진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1645073339534.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 카페 라떼',
//     description:
//       '진한 에스프레소와 부드러운 우유가 만나 고소한 풍미를 더하는 메뉴 가장 대중적인 메뉴',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1645073265123.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '연유 콜드브루',
//     description:
//       '베트남풍 연유의 달콤한 맛과 밸런스 잡힌 콜드브루가 어우러져 특색있게 즐길 수 있는 음료',
//     price: '4700',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320780643.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '흑당 콜드브루',
//     description:
//       '콜드브루에 진하고 달콤한 흑당과 고소한 우유가 어우러진 커피음료 ',
//     price: '4700',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320738273.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '콜드브루 화이트 비엔나',
//     description:
//       '달콤한 크림과 화이트 초콜릿향, 아이리쉬크림향이 더해진 콜드브루',
//     price: '4900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320860534.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '콜드브루 니트로',
//     description:
//       '질소투입방식을 통해 신선하고 부드러운 거품과 목넘김, 풍미를 느낄 수 있는 커피',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320870899.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '콜드브루 라떼',
//     description:
//       '콜드브루의 깔끔하고 쌉싸름한 풍미가 고소한 우유와 만나 누구나 부담없이 즐길 수 있는 음료',
//     price: '4500',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647320848557.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '아포가토 오리지널',
//     description:
//       '대중들에게 가장 친숙한 타입의 아포가토로 에스프레소와 아몬드를 토핑한 제품',
//     price: '4700',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1691731083701.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '토피넛 라떼',
//     description:
//       '고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료 ',
//     price: '',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1694414746800.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 토피넛 라떼',
//     description:
//       '고소한 아몬드의 맛과 달콤한 코코아가 조화롭게 어우러진 달콤한 음료 ',
//     price: '',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1694414812893.png',
//     category: 'coffee',
//     createdAt: new Date(),
//   },
// ]

// const initialNonCoffee: Product[] = [
//   {
//     name: '아이스티 복숭아',
//     description:
//       '홍차의 깊은 맛과 풍부한 복숭아 향이 어우러진 달콤한 여름철 인기 음료',
//     price: '2900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647322929626.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '고구마 라떼',
//     description:
//       '호박고구마를 활용하여 달콤하고 고소한 고구마의 풍미가 진하게 느껴지는 음료',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647322131838.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 고구마 라떼',
//     description:
//       '호박고구마를 활용하여 달콤하고 고소한 고구마의 풍미가 진하게 느껴지는 음료',
//     price: '3800',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647322145592.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '녹차 라떼',
//     description: '녹차에 우유가 더해져 부담없이 즐길 수 있는 음료',
//     price: '3900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647321741180.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 녹차 라떼',
//     description: '녹차에 우유가 더해져 부담없이 즐길 수 있는 음료',
//     price: '3900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647321755481.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '아이스 초코',
//     description:
//       '진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료',
//     price: '3900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647321814289.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 초코',
//     description:
//       '진한 모카시럽과 부드러운 우유, 그리고 달콤한 휘핑크림의 삼박자가 조화를 이루는 음료',
//     price: '3900',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647321825736.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '생강차',
//     description:
//       '생강 특유의 진하고 풍부한 맛과 향미를 느낄 수 있으며, 은은하고 부드러운 단맛의 유자와 꿀이 더해진 음료',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647322677153.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 생강차',
//     description:
//       '생강 특유의 진하고 풍부한 맛과 향미를 느낄 수 있으며, 은은하고 부드러운 단맛의 유자와 꿀이 더해진 음료',
//     price: '4200',
//     imageURL: 'https://www.ediya.com/files/menu/IMG_1647322669524.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: '쌍화차',
//     description:
//       '전통 쌍화차의 느낌을 재해석하여 다양한 연령층이 즐길 수 있도록 은은한 향과 고소함을 강조한 음료',
//     price: '4200',
//     imageURL: '	https://www.ediya.com/files/menu/IMG_1647322778699.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
//   {
//     name: 'HOT 쌍화차',
//     description:
//       '전통 쌍화차의 느낌을 재해석하여 다양한 연령층이 즐길 수 있도록 은은한 향과 고소함을 강조한 음료',
//     price: '4200',
//     imageURL: '	https://www.ediya.com/files/menu/IMG_1647322753151.png',
//     category: 'non-coffee',
//     createdAt: new Date(),
//   },
// ]

const initailFood: Product[] = [
  {
    name: "소금빵",
    description: "겉은 바삭하고 속은 촉촉한 겉바속촉 소금빵",
    price: "3000",
    imageURL: "https://www.ediya.com/files/menu/IMG_1678683033413.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "소금 버터 스콘",
    description:
      "버터 풍미가 가득 느껴지는 고소하고 짭짤한 소금 버터 스콘(딸기잼과 함께 제공)",
    price: "2900",
    imageURL: "https://www.ediya.com/files/menu/IMG_1678682689834.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "밀크 휘낭시에",
    description: "맛있게 구워 낸 진하고 고소한 맛이 느껴지는 밀크 휘낭시에",
    price: "2500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1705884923446.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "펄 슈가 카스테라",
    description:
      "오독오독 씹히는 펄슈가(크리스탈슈가)와 촉촉한 식감을 즐길 수 있는 정석대로 만든 펄슈가 카스테라 ",
    price: "3100",
    imageURL: "https://www.ediya.com/files/menu/IMG_1705884751335.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "크랜베리 월넛 베이글",
    description: "크랜베리와 호두가 들어가서 씹을수록 감칠맛이 감도는 베이글",
    price: "2500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1709012509529.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "에그 베이컨 과카몰리 샌드위치",
    description:
      "겉은 바삭하고 속은 부드러운 깜빠뉴 사이에 촉촉한 과카몰리 샐러드와 바삭한 베이컨, 치즈, 달걀 프라이가 조화를 이룬 제품",
    price: "4500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1572224047505.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "허니 브레드",
    description:
      "은은한 시나몬과 진한 카라멜 코팅이 된 허니브레드에 휘핑크림을 더해 한결 부드러워진 맛의 허니브레드",
    price: "4500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1510911706733.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "초코 티라미수",
    description:
      "크림치즈와 달콤한 초콜렛이 조화를 이루고 진하고 고운 코코아 파우더가 맛에 깊이를 더하는 메뉴",
    price: "4000",
    imageURL: "https://www.ediya.com/files/menu/IMG_1527143944548.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "수플레 치즈 케이크",
    description: "치즈 고유의 부드러움과 촉촉함이 살아있는 케이크",
    price: "4500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1527144123168.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "밀크레이프 케이크",
    description:
      "한 장 한 장 정성스럽게 구운 촉촉한 크레이프 시트 사이에 겹겹이 느껴지는 부드러운 크림이 포인트인 케이크",
    price: "4500",
    imageURL: "https://www.ediya.com/files/menu/IMG_1599525704801.png",
    category: "food",
    createdAt: new Date(),
  },
  {
    name: "떠먹는 티라미수",
    description:
      "진한 에스프레소 시럽을 이탈리아 정통 쿠키인 레이디핑거에 적셔 마스카포네 치즈 무스와 코코아파우더를 토핑한 티라미수 케이크 ",
    price: "4400",
    imageURL: "https://www.ediya.com/files/menu/IMG_1564373464458.png",
    category: "food",
    createdAt: new Date(),
  },
];

export default function initailUpload() {
  initialDataUpload(initailFood);
}
