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
    <main className="min-h-screen bg-[#D2691E]" style={{
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(0,0,0,.03) 35px,
        rgba(0,0,0,.03) 70px
      )`
    }}>
      {/* 홈 아이콘 */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 hover:opacity-80 transition-opacity duration-200"
        style={{
          display: 'block',
          width: '48px',
          height: '48px',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          backgroundColor: 'transparent'
        }}
      >
        <img
          src="/ntss.png"
          alt="NTSS Home"
          width="48"
          height="48"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            imageRendering: 'auto'
          }}
          loading="eager"
        />
      </Link>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/dime"
            className="inline-block text-orange-100 hover:text-white mb-8 transition font-bold"
          >
            ← NTSS Di Me로 돌아가기
          </Link>

          {/* 멕시칸 전통 장식 헤더 */}
          <div className="bg-[#8B4513] border-4 border-[#D2691E] p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>

            <header className="text-center relative">
              <div className="flex justify-center gap-3 mb-4">
                <span className="text-4xl">🌮</span>
                <h1 className="text-4xl md:text-5xl font-black text-[#FFD700] mb-2 tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                  MENÚ MEXICANO
                </h1>
                <span className="text-4xl">🌶️</span>
              </div>
              <p className="text-orange-200 text-base font-semibold">
                Auténtica Cocina Mexicana
              </p>
            </header>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-8 py-3 text-base font-bold border-3 transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-[#DC143C] text-white border-[#8B0000] shadow-lg scale-105'
                    : 'bg-[#FFD700] text-[#8B4513] border-[#DAA520] hover:bg-[#FFA500]'
                }`}
              >
                <span className="text-xl mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-[#FFF8DC] border-4 border-[#D2691E] cursor-pointer hover:border-[#DC143C] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-2 right-2 bg-[#DC143C] text-white px-3 py-1 text-xs font-bold uppercase z-10">
                  {item.category}
                </div>
                <div className="relative w-full h-56 overflow-hidden border-b-4 border-[#D2691E]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 bg-[#FFF8DC]">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-black text-[#8B4513] tracking-tight">
                      {item.name}
                    </h3>
                    {item.spicyLevel > 0 && <SpicyLevel level={item.spicyLevel} />}
                  </div>
                  <p className="text-[#8B4513] text-sm mb-4 leading-relaxed font-medium">{item.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-[#D2691E]">
                    <span className="text-2xl font-black text-[#DC143C]">
                      ₩{item.price}
                    </span>
                    <span className="text-[#FFD700] text-2xl">★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 모달 */}
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            >
              <div
                className="bg-[#FFF8DC] border-8 border-[#D2691E] max-w-lg w-full relative shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 bg-[#DC143C] hover:bg-[#8B0000] w-12 h-12 flex items-center justify-center text-white text-3xl font-black transition z-10 shadow-lg"
                >
                  ×
                </button>
                <div className="relative w-full h-80 border-b-4 border-[#D2691E] mt-4">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-black text-[#8B4513] tracking-tight">
                      {selectedItem.name}
                    </h2>
                    {selectedItem.spicyLevel > 0 && (
                      <div className="flex flex-col items-end">
                        <SpicyLevel level={selectedItem.spicyLevel} />
                        <span className="text-xs text-[#DC143C] mt-1 font-bold">
                          {selectedItem.spicyLevel === 1 && '순한맛'}
                          {selectedItem.spicyLevel === 2 && '보통'}
                          {selectedItem.spicyLevel === 3 && '매운맛'}
                          {selectedItem.spicyLevel === 4 && '아주매운맛'}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#8B4513] mb-6 leading-relaxed font-medium">
                    {selectedItem.description}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t-4 border-[#D2691E]">
                    <span className="text-sm text-[#8B4513] font-bold uppercase tracking-wider bg-[#FFD700] px-4 py-2">
                      {selectedItem.category}
                    </span>
                    <span className="text-3xl font-black text-[#DC143C]">
                      ₩{selectedItem.price}
                    </span>
                  </div>
                  <div className="mt-6 p-4 bg-[#DC143C] text-center">
                    <p className="text-sm text-white font-bold">
                      이것은 데모입니다. 실제 메뉴는 고객님의 브랜드에 맞게 커스터마이징됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <div className="mt-16 text-center bg-[#8B4513] border-4 border-[#D2691E] p-12 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#228B22] via-white to-[#DC143C]"></div>

            <h3 className="text-3xl font-black text-[#FFD700] mb-6 tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              🎨 맞춤 제작 서비스 🎨
            </h3>
            <p className="text-orange-100 mb-8 leading-relaxed text-lg font-semibold">
              실제 서비스에서는 고객님의 메뉴, 브랜드 컬러, 로고, 이미지를
              활용하여 완전히 커스터마이징된 디지털 메뉴판을 제작해드립니다.
            </p>
            <Link
              href="/dime"
              className="inline-block bg-[#DC143C] hover:bg-[#8B0000] text-white text-lg font-black py-4 px-10 tracking-wider transition-all duration-200 uppercase shadow-lg hover:scale-105"
            >
              대기명단 등록하기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
