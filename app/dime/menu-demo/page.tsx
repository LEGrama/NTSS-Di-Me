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
  },
  {
    id: 2,
    name: '비프 타코',
    description: '육즙 가득한 비프와 신선한 채소',
    price: '13,000',
    image: '/menu/beef-taco.jpg',
    category: '타코',
  },
  {
    id: 3,
    name: '포크 타코',
    description: '부드러운 포크와 매콤한 소스의 조화',
    price: '12,000',
    image: '/menu/pork-taco.jpg',
    category: '타코',
  },
  {
    id: 4,
    name: '치킨 타코',
    description: '그릴에 구운 치킨과 아보카도 크림',
    price: '11,000',
    image: '/menu/chicken-taco.jpg',
    category: '타코',
  },
  // 퀘사디아
  {
    id: 5,
    name: '비프 퀘사디아',
    description: '치즈와 비프가 가득한 따끈한 퀘사디아',
    price: '15,000',
    image: '/menu/beef-quesadilla.jpg',
    category: '퀘사디아',
  },
  {
    id: 6,
    name: '치킨 퀘사디아',
    description: '그릴 치킨과 녹인 치즈의 완벽한 조합',
    price: '14,000',
    image: '/menu/chicken-quesadilla.jpg',
    category: '퀘사디아',
  },
  {
    id: 7,
    name: '포크 퀘사디아',
    description: '풀드 포크와 멜팅 치즈의 환상 조합',
    price: '14,000',
    image: '/menu/pork-quesadilla.jpg',
    category: '퀘사디아',
  },
  // 사이드
  {
    id: 8,
    name: '칠리 치즈 프라이즈',
    description: '바삭한 감자튀김에 칠리와 치즈 토핑',
    price: '8,000',
    image: '/menu/chili-cheese-fries.jpg',
    category: '사이드',
  },
  {
    id: 9,
    name: '과카몰리와 칩스',
    description: '신선한 아보카도 과카몰리와 또르띠야 칩스',
    price: '9,000',
    image: '/menu/guacamole-chips.jpg',
    category: '사이드',
  },
  {
    id: 10,
    name: '프레시 치킨 윙즈',
    description: '겉은 바삭 속은 촉촉한 치킨 윙즈',
    price: '10,000',
    image: '/menu/chicken-wings.jpg',
    category: '사이드',
  },
];

const categories = ['전체', '타코', '퀘사디아', '사이드'];

export default function MenuDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems =
    selectedCategory === '전체'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#a60202]">
      {/* 홈 아이콘 */}
      <Link href="/" className="fixed top-6 left-6 z-50 hover:opacity-80 transition">
        <Image src="/ntss.svg" alt="NTSS Home" width={48} height={48} className="rounded-lg w-12 h-12" unoptimized priority />
      </Link>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/dime"
            className="inline-block text-white/70 hover:text-white mb-8 transition"
          >
            ← NTSS Di Me로 돌아가기
          </Link>

          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              디지털 메뉴판 데모
            </h1>
            <p className="text-white/80 font-medium">
              메뉴를 터치하여 상세 정보를 확인하세요
            </p>
          </header>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-white text-[#a60202] scale-105 shadow-lg'
                    : 'bg-[#a60202] text-white border-2 border-white hover:bg-white hover:text-[#a60202]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white p-6 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 border-2 border-white"
              >
                <div className="relative w-full h-40 mb-4 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#a60202]/70 font-semibold uppercase">
                    {item.category}
                  </span>
                  <span className="text-lg font-bold text-[#a60202]">
                    ₩{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 모달 */}
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedItem(null)}
            >
              <div
                className="bg-white p-8 max-w-lg w-full border-4 border-[#a60202] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-[#a60202] hover:text-[#8a0101] text-3xl font-bold"
                >
                  ×
                </button>
                <div className="relative w-full h-64 mb-6 bg-gray-100">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-[#a60202] mb-3">
                  {selectedItem.name}
                </h2>
                <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-[#a60202]/70 font-semibold uppercase">
                    {selectedItem.category}
                  </span>
                  <span className="text-2xl font-bold text-[#a60202]">
                    ₩{selectedItem.price}
                  </span>
                </div>
                <div className="bg-[#a60202] text-white p-4 text-center">
                  <p className="text-sm">
                    이것은 데모입니다. 실제 메뉴는 고객님의 브랜드에 맞게
                    커스터마이징됩니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <div className="mt-12 text-center border-2 border-white p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              귀하의 브랜드에 맞는 맞춤 제작
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              실제 서비스에서는 고객님의 메뉴, 브랜드 컬러, 로고, 이미지를
              활용하여 완전히 커스터마이징된 디지털 메뉴판을 제작해드립니다.
            </p>
            <Link
              href="/dime"
              className="inline-block bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-[#a60202] font-bold text-lg py-4 px-8 transition-all duration-200"
            >
              대기명단 등록하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
