'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  spicyLevel: number; // 0: 안맵게, 1: 순한맛, 2: 보통, 3: 매운맛, 4: 아주매운맛
}

const menuItems: MenuItem[] = [
  // 타코
  {
    id: 1,
    name: '피쉬 타코',
    description: '신선한 생선과 특제 소스가 어우러진 타코',
    price: '12,000',
    image: '/menu/fish-taco.jpg',
    category: '타코',
    spicyLevel: 1,
  },
  {
    id: 2,
    name: '비프 타코',
    description: '육즙 가득한 비프와 신선한 채소',
    price: '13,000',
    image: '/menu/beef-taco.jpg',
    category: '타코',
    spicyLevel: 2,
  },
  {
    id: 3,
    name: '포크 타코',
    description: '부드러운 포크와 매콤한 소스의 조화',
    price: '12,000',
    image: '/menu/pork-taco.jpg',
    category: '타코',
    spicyLevel: 3,
  },
  {
    id: 4,
    name: '치킨 타코',
    description: '그릴에 구운 치킨과 아보카도 크림',
    price: '11,000',
    image: '/menu/chicken-taco.jpg',
    category: '타코',
    spicyLevel: 0,
  },
  // 퀘사디아
  {
    id: 5,
    name: '비프 퀘사디아',
    description: '치즈와 비프가 가득한 따끈한 퀘사디아',
    price: '15,000',
    image: '/menu/beef-quesadilla.jpg',
    category: '퀘사디아',
    spicyLevel: 1,
  },
  {
    id: 6,
    name: '치킨 퀘사디아',
    description: '그릴 치킨과 녹인 치즈의 완벽한 조합',
    price: '14,000',
    image: '/menu/chicken-quesadilla.jpg',
    category: '퀘사디아',
    spicyLevel: 0,
  },
  {
    id: 7,
    name: '포크 퀘사디아',
    description: '풀드 포크와 멜팅 치즈의 환상 조합',
    price: '14,000',
    image: '/menu/pork-quesadilla.jpg',
    category: '퀘사디아',
    spicyLevel: 2,
  },
  // 사이드
  {
    id: 8,
    name: '칠리 치즈 프라이즈',
    description: '바삭한 감자튀김에 칠리와 치즈 토핑',
    price: '8,000',
    image: '/menu/chili-cheese-fries.jpg',
    category: '사이드',
    spicyLevel: 4,
  },
  {
    id: 9,
    name: '과카몰리와 칩스',
    description: '신선한 아보카도 과카몰리와 또르띠야 칩스',
    price: '9,000',
    image: '/menu/guacamole-chips.jpg',
    category: '사이드',
    spicyLevel: 0,
  },
  {
    id: 10,
    name: '프레시 치킨 윙즈',
    description: '겉은 바삭 속은 촉촉한 치킨 윙즈',
    price: '10,000',
    image: '/menu/chicken-wings.jpg',
    category: '사이드',
    spicyLevel: 1,
  },
];

const categories = [
  { name: '전체', icon: '🍽️' },
  { name: '타코', icon: '🌮' },
  { name: '퀘사디아', icon: '🧀' },
  { name: '사이드', icon: '🍟' },
];

// 맵기 표시 컴포넌트
const SpicyLevel = ({ level }: { level: number }) => {
  const peppers = [];
  for (let i = 0; i < level; i++) {
    peppers.push(
      <span key={i} className="text-red-600">
        🌶️
      </span>
    );
  }
  return <div className="flex gap-0.5">{peppers}</div>;
};

export default function MenuDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems =
    selectedCategory === '전체'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-orange-600">
      {/* 홈 아이콘 */}
      <Link href="/" className="fixed top-6 left-6 z-50 hover:opacity-80 transition">
        <Image src="/ntss.svg" alt="NTSS Home" width={48} height={48} className="rounded-lg w-12 h-12" unoptimized priority />
      </Link>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/dime"
            className="inline-block text-white/90 hover:text-white mb-8 transition font-bold"
          >
            ← NTSS Di Me로 돌아가기
          </Link>

          {/* 멕시칸 깃발 장식 */}
          <div className="h-3 w-full mb-8 flex">
            <div className="flex-1 bg-green-600"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-red-600"></div>
          </div>

          <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              🌮 디지털 메뉴판 데모 🌮
            </h1>
            <p className="text-white text-lg font-semibold drop-shadow">
              메뉴를 터치하여 상세 정보를 확인하세요
            </p>
          </header>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-8 py-4 font-black text-base rounded-full shadow-lg transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-yellow-400 text-amber-900 scale-110 shadow-2xl'
                    : 'bg-white/90 text-orange-700 hover:bg-yellow-300 hover:scale-105'
                }`}
              >
                <span className="text-2xl mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-amber-50 rounded-2xl p-6 cursor-pointer hover:rotate-1 hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl border-4 border-yellow-400"
              >
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-amber-900">
                    {item.name}
                  </h3>
                  {item.spicyLevel > 0 && <SpicyLevel level={item.spicyLevel} />}
                </div>
                <p className="text-amber-800 text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-orange-600 font-bold uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-2xl font-black text-orange-600">
                    ₩{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 모달 */}
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <div
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 max-w-lg w-full border-8 border-yellow-400 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-orange-600 hover:text-red-600 text-4xl font-black transition hover:rotate-90 duration-300"
                >
                  ×
                </button>
                <div className="relative w-full h-72 mb-6 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-4xl font-black text-amber-900">
                    {selectedItem.name}
                  </h2>
                  {selectedItem.spicyLevel > 0 && (
                    <div className="flex flex-col items-end">
                      <SpicyLevel level={selectedItem.spicyLevel} />
                      <span className="text-xs text-orange-700 mt-1 font-semibold">
                        {selectedItem.spicyLevel === 1 && '순한맛'}
                        {selectedItem.spicyLevel === 2 && '보통'}
                        {selectedItem.spicyLevel === 3 && '매운맛'}
                        {selectedItem.spicyLevel === 4 && '아주매운맛'}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-amber-800 mb-6 text-lg leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="flex justify-between items-center mb-6 bg-white/50 p-4 rounded-xl">
                  <span className="text-sm text-orange-700 font-bold uppercase tracking-wider">
                    {selectedItem.category}
                  </span>
                  <span className="text-3xl font-black text-orange-600">
                    ₩{selectedItem.price}
                  </span>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 text-center rounded-xl shadow-lg">
                  <p className="text-sm font-semibold">
                    이것은 데모입니다. 실제 메뉴는 고객님의 브랜드에 맞게
                    커스터마이징됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <div className="mt-12 text-center bg-white/10 backdrop-blur-md border-4 border-yellow-400 rounded-3xl p-10 max-w-2xl mx-auto shadow-2xl">
            <h3 className="text-3xl font-black text-white mb-6 drop-shadow-lg">
              🎨 귀하의 브랜드에 맞는 맞춤 제작
            </h3>
            <p className="text-white mb-8 leading-relaxed text-lg">
              실제 서비스에서는 고객님의 메뉴, 브랜드 컬러, 로고, 이미지를
              활용하여 완전히 커스터마이징된 디지털 메뉴판을 제작해드립니다.
            </p>
            <Link
              href="/dime"
              className="inline-block bg-yellow-400 hover:bg-yellow-300 hover:scale-110 hover:shadow-2xl text-amber-900 font-black text-xl py-5 px-12 rounded-full transition-all duration-300 shadow-xl"
            >
              대기명단 등록하기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
