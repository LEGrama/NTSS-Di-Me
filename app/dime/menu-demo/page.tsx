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
  {
    id: 1,
    name: '트러플 크림 파스타',
    description: '신선한 트러플과 크림의 완벽한 조화',
    price: '24,000',
    image: '🍝',
    category: '메인 디쉬',
  },
  {
    id: 2,
    name: '안심 스테이크',
    description: '부드러운 안심과 시그니처 소스',
    price: '38,000',
    image: '🥩',
    category: '메인 디쉬',
  },
  {
    id: 3,
    name: '랍스터 리조또',
    description: '통통한 랍스터살과 크리미한 리조또',
    price: '42,000',
    image: '🦞',
    category: '메인 디쉬',
  },
  {
    id: 4,
    name: '시저 샐러드',
    description: '신선한 로메인과 파마산 치즈',
    price: '16,000',
    image: '🥗',
    category: '애피타이저',
  },
  {
    id: 5,
    name: '브루스케타',
    description: '토마토와 바질의 클래식한 조합',
    price: '14,000',
    image: '🍞',
    category: '애피타이저',
  },
  {
    id: 6,
    name: '티라미수',
    description: '에스프레소 향이 가득한 이탈리안 디저트',
    price: '12,000',
    image: '🍰',
    category: '디저트',
  },
];

const categories = ['전체', '메인 디쉬', '애피타이저', '디저트'];

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
        <Image src="/icon.jpeg" alt="NTSS Home" width={48} height={48} className="rounded-lg object-cover w-12 h-12" />
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
                <div className="text-6xl mb-4 text-center">{item.image}</div>
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
                <div className="text-8xl mb-6 text-center">
                  {selectedItem.image}
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
