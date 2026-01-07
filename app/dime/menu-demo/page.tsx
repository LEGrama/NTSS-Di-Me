'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: { ko: string; en: string };
  description: { ko: string; en: string };
  price: string;
  image?: string;
  video?: string;
  category: { ko: string; en: string };
  spicyLevel: number; // 0: 안맵게, 1: 순한맛, 2: 보통, 3: 매운맛, 4: 아주매운맛
  isBest?: boolean;
  // 상세 페이지용 이미지 (860px 가로)
  detailImage?: string;
  // 상세 정보
  ingredients?: { ko: string; en: string };
  nutrition?: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
  allergens?: { ko: string; en: string };
  pairing?: { ko: string[]; en: string[] };
  reviews?: {
    rating: number;
    text: { ko: string; en: string };
    author: { ko: string; en: string };
  }[];
}

const menuItems: MenuItem[] = [
  // 타코
  {
    id: 1,
    name: { ko: '피쉬 타코', en: 'Fish Taco' },
    description: { ko: '신선한 생선과 특제 소스가 어우러진 타코', en: 'Fresh fish with special sauce in a soft tortilla' },
    price: '12,000',
    video: '/menu/fish-taco.mp4',
    image: '/menu/fish-taco.jpg',
    category: { ko: '타코', en: 'Tacos' },
    spicyLevel: 1,
    isBest: true,
    detailImage: '/menu/fish-taco-detail.jpg',
    allergens: {
      ko: '이 제품은 밀, 생선, 유제품을 포함하고 있습니다.',
      en: 'Contains: Wheat, Fish, Dairy'
    }
  },
  {
    id: 2,
    name: { ko: '비프 타코', en: 'Beef Taco' },
    description: { ko: '육즙 가득한 비프와 신선한 채소', en: 'Juicy beef with fresh vegetables' },
    price: '13,000',
    image: '/menu/beef-taco.jpg',
    category: { ko: '타코', en: 'Tacos' },
    spicyLevel: 2,
  },
  {
    id: 3,
    name: { ko: '포크 타코', en: 'Pork Taco' },
    description: { ko: '부드러운 포크와 매콤한 소스의 조화', en: 'Tender pork with spicy sauce' },
    price: '12,000',
    image: '/menu/pork-taco.jpg',
    category: { ko: '타코', en: 'Tacos' },
    spicyLevel: 3,
  },
  {
    id: 4,
    name: { ko: '치킨 타코', en: 'Chicken Taco' },
    description: { ko: '그릴에 구운 치킨과 아보카도 크림', en: 'Grilled chicken with avocado cream' },
    price: '11,000',
    image: '/menu/chicken-taco.jpg',
    category: { ko: '타코', en: 'Tacos' },
    spicyLevel: 0,
  },
  // 퀘사디아
  {
    id: 5,
    name: { ko: '비프 퀘사디아', en: 'Beef Quesadilla' },
    description: { ko: '치즈와 비프가 가득한 따끈한 퀘사디아', en: 'Warm quesadilla filled with cheese and beef' },
    price: '15,000',
    image: '/menu/beef-quesadilla.jpg',
    category: { ko: '퀘사디아', en: 'Quesadillas' },
    spicyLevel: 1,
  },
  {
    id: 6,
    name: { ko: '치킨 퀘사디아', en: 'Chicken Quesadilla' },
    description: { ko: '그릴 치킨과 녹인 치즈의 완벽한 조합', en: 'Perfect combination of grilled chicken and melted cheese' },
    price: '14,000',
    image: '/menu/chicken-quesadilla.jpg',
    category: { ko: '퀘사디아', en: 'Quesadillas' },
    spicyLevel: 0,
  },
  {
    id: 7,
    name: { ko: '포크 퀘사디아', en: 'Pork Quesadilla' },
    description: { ko: '풀드 포크와 멜팅 치즈의 환상 조합', en: 'Amazing blend of pulled pork and melting cheese' },
    price: '14,000',
    image: '/menu/pork-quesadilla.jpg',
    category: { ko: '퀘사디아', en: 'Quesadillas' },
    spicyLevel: 2,
  },
  // 사이드
  {
    id: 8,
    name: { ko: '칠리 치즈 프라이즈', en: 'Chili Cheese Fries' },
    description: { ko: '바삭한 감자튀김에 칠리와 치즈 토핑', en: 'Crispy fries topped with chili and cheese' },
    price: '8,000',
    image: '/menu/chili-cheese-fries.jpg',
    category: { ko: '사이드', en: 'Sides' },
    spicyLevel: 4,
  },
  {
    id: 9,
    name: { ko: '과카몰리와 칩스', en: 'Guacamole & Chips' },
    description: { ko: '신선한 아보카도 과카몰리와 또르띠야 칩스', en: 'Fresh avocado guacamole with tortilla chips' },
    price: '9,000',
    image: '/menu/guacamole-chips.jpg',
    category: { ko: '사이드', en: 'Sides' },
    spicyLevel: 0,
  },
  {
    id: 10,
    name: { ko: '프레시 치킨 윙즈', en: 'Fresh Chicken Wings' },
    description: { ko: '겉은 바삭 속은 촉촉한 치킨 윙즈', en: 'Crispy on the outside, juicy on the inside chicken wings' },
    price: '10,000',
    image: '/menu/chicken-wings.jpg',
    category: { ko: '사이드', en: 'Sides' },
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
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const filteredItems =
    selectedCategory === '전체'
      ? menuItems
      : menuItems.filter((item) => item.category.ko === selectedCategory);

  const translations = {
    ko: {
      backButton: '← NTSS Di Me로 돌아가기',
      title: 'MENÚ MEXICANO',
      subtitle: 'Auténtica Cocina Mexicana',
      all: '전체',
      tacos: '타코',
      quesadillas: '퀘사디아',
      sides: '사이드',
      spicyLevels: ['순한맛', '보통', '매운맛', '아주매운맛'],
      demoNote: '이것은 데모입니다. 실제 메뉴는 고객님의 브랜드에 맞게 커스터마이징됩니다.',
      ctaTitle: '🎨 맞춤 제작 서비스 🎨',
      ctaDescription: '실제 서비스에서는 고객님의 메뉴, 브랜드 컬러, 로고, 이미지를 활용하여 완전히 커스터마이징된 디지털 메뉴판을 제작해드립니다.',
      ctaButton: '대기명단 등록하기 →'
    },
    en: {
      backButton: '← Back to NTSS Di Me',
      title: 'MENÚ MEXICANO',
      subtitle: 'Auténtica Cocina Mexicana',
      all: 'All',
      tacos: 'Tacos',
      quesadillas: 'Quesadillas',
      sides: 'Sides',
      spicyLevels: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
      demoNote: 'This is a demo. Actual menus will be fully customized to match your brand.',
      ctaTitle: '🎨 Custom Design Service 🎨',
      ctaDescription: 'In actual service, we create a fully customized digital menu using your menu items, brand colors, logo, and images.',
      ctaButton: 'Join Waitlist →'
    }
  };

  const t = translations[language];

  return (
    <main 
      className="min-h-screen bg-[#ede7d9] relative" 
      style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        // WebP를 우선 사용하고, 지원하지 않으면 PNG 사용
        backgroundImage: 'url(/mexican-pattern.webp), url(/mexican-pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
        backgroundPosition: '0 0'
      }}
    >
      {/* 배경 오버레이 - 패턴 위에 살짝 덮어서 가독성 향상 */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(237, 231, 217, 0.7)' // 베이지색 오버레이로 패턴을 살짝 흐리게
        }}
      />
      <div className="relative z-10">
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
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/dime"
              className="inline-block text-[#00512e] hover:text-[#00512e]/80 transition font-bold"
            >
              {t.backButton}
            </Link>

            <button
              onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
              className="bg-[#f77f02] hover:bg-[#f77f02]/90 text-white font-bold px-4 py-2 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-lg">{language === 'ko' ? '🇺🇸' : '🇰🇷'}</span>
              {language === 'ko' ? 'English' : '한국어'}
            </button>
          </div>

          {/* 멕시칸 전통 장식 헤더 */}
          <div className="bg-[#00512e] border-8 border-[#f77f02] p-12 mb-12 relative overflow-hidden">
            <header className="text-center relative">
              <div className="flex justify-center gap-4 mb-4">
                <span className="text-5xl">🌮</span>
                <h1 className="text-5xl md:text-6xl font-black text-[#f77f02] mb-2 tracking-wider uppercase" style={{ textShadow: '3px 3px 0px #d62829', letterSpacing: '0.05em' }}>
                  {t.title}
                </h1>
                <span className="text-5xl">🌶️</span>
              </div>
              <p className="text-[#ede7d9] text-xl font-bold uppercase tracking-widest">
                {t.subtitle}
              </p>
            </header>
          </div>

          {/* 홍보 영상 섹션 */}
          <div className="mb-12 border-8 border-[#f77f02] bg-black relative overflow-hidden">
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/video-poster.jpg"
              >
                <source src="/promo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category, index) => {
              const categoryNames = {
                ko: ['전체', '타코', '퀘사디아', '사이드'],
                en: [t.all, t.tacos, t.quesadillas, t.sides]
              };
              const displayName = categoryNames[language][index];

              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-8 py-3 text-lg font-black border-4 transition-all duration-200 uppercase tracking-wider ${
                    selectedCategory === category.name
                      ? 'bg-[#d62829] text-white border-[#00512e] shadow-lg scale-105'
                      : 'bg-[#f77f02] text-white border-[#00512e] hover:bg-[#d62829]'
                  }`}
                >
                  <span className="text-2xl mr-2">{category.icon}</span>
                  {displayName}
                </button>
              );
            })}
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white border-6 border-[#00512e] cursor-pointer hover:border-[#f77f02] hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 bg-[#d62829] text-white px-4 py-2 text-sm font-black uppercase z-10 tracking-wider">
                  {item.category[language]}
                </div>
                {item.isBest && (
                  <div className="absolute top-3 left-3 bg-[#f77f02] text-white px-4 py-2 text-sm font-black uppercase z-10 tracking-wider">
                    BEST
                  </div>
                )}
                <div className="relative w-full h-56 overflow-hidden border-b-6 border-[#00512e]">
                  {item.video ? (
                    <video
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={item.image}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item.image!}
                      alt={item.name[language]}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-3xl font-black text-[#00512e] tracking-tight uppercase">
                      {item.name[language]}
                    </h3>
                    {item.spicyLevel > 0 && <SpicyLevel level={item.spicyLevel} />}
                  </div>
                  <p className="text-[#00512e] text-base mb-4 leading-relaxed font-semibold">{item.description[language]}</p>
                  <div className="flex justify-between items-center pt-4 border-t-4 border-[#ede7d9]">
                    <span className="text-3xl font-black text-[#d62829]">
                      ₩{item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 모달 */}
          {selectedItem && (
            <div className="fixed inset-0 bg-[#ede7d9] z-50 overflow-y-auto">
              {/* 상단 네비게이션 바 */}
              <div className="sticky top-0 z-10 bg-[#00512e] border-b-6 border-[#f77f02] px-6 py-4 flex justify-between items-center shadow-xl">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-white hover:text-[#f77f02] transition"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-2xl font-black text-[#f77f02] uppercase tracking-wider">
                  {language === 'ko' ? '메뉴 상세' : 'Menu Detail'}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-[#d62829] hover:bg-[#d62829]/90 w-10 h-10 flex items-center justify-center text-white text-3xl font-black transition rounded-full"
                >
                  ×
                </button>
              </div>

              {/* 메인 컨텐츠 */}
              <div className="max-w-5xl mx-auto pb-8">
                {/* 이미지/영상 섹션 */}
                <div className="relative w-full bg-[#ede7d9] flex items-center justify-center" style={{ minHeight: '400px' }}>
                  {selectedItem.video ? (
                    <video
                      className="w-full h-auto"
                      style={{ maxHeight: '80vh' }}
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={selectedItem.image}
                    >
                      <source src={selectedItem.video} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="relative w-full flex justify-center">
                      <Image
                        src={selectedItem.image!}
                        alt={selectedItem.name[language]}
                        width={860}
                        height={0}
                        style={{ height: 'auto', width: 'auto', maxWidth: '100%', maxHeight: '80vh' }}
                      />
                    </div>
                  )}
                  {selectedItem.isBest && (
                    <div className="absolute top-6 left-6 bg-[#f77f02] text-white px-6 py-3 text-lg font-black uppercase tracking-wider shadow-2xl">
                      ⭐ BEST
                    </div>
                  )}
                </div>

                {/* 상품 정보 카드 */}
                <div className="bg-white border-8 border-[#00512e] mx-4 mt-6 p-8 shadow-2xl">
                  {/* 상단: 카테고리와 이름 */}
                  <div className="mb-6">
                    <div className="inline-block bg-[#f77f02] text-white px-5 py-2 text-base font-black uppercase tracking-wider mb-4 shadow-md">
                      {selectedItem.category[language]}
                    </div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-5xl md:text-6xl font-black text-[#00512e] tracking-tight uppercase flex-1">
                        {selectedItem.name[language]}
                      </h2>
                      {selectedItem.spicyLevel > 0 && (
                        <div className="flex flex-col items-end bg-[#ede7d9] px-5 py-3 rounded-lg ml-4">
                          <SpicyLevel level={selectedItem.spicyLevel} />
                          <span className="text-sm text-[#d62829] mt-2 font-black uppercase tracking-wider">
                            {t.spicyLevels[selectedItem.spicyLevel - 1]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 가격 */}
                  <div className="mb-8 pb-8 border-b-4 border-[#ede7d9]">
                    <div className="flex items-baseline gap-3">
                      <span className="text-6xl font-black text-[#d62829]">₩{selectedItem.price}</span>
                      <span className="text-2xl text-[#00512e] font-bold">{language === 'ko' ? '원' : 'KRW'}</span>
                    </div>
                  </div>

                  {/* 설명 */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#00512e] uppercase mb-4 tracking-wider flex items-center gap-2">
                      <span>📝</span> {language === 'ko' ? '상세 설명' : 'Description'}
                    </h3>
                    <p className="text-[#00512e] leading-relaxed font-semibold text-xl bg-[#ede7d9] p-6 rounded-lg">
                      {selectedItem.description[language]}
                    </p>
                  </div>

                  {/* 알레르기 정보 */}
                  {selectedItem.allergens && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-[#00512e] uppercase mb-4 tracking-wider flex items-center gap-2">
                        <span>⚠️</span> {language === 'ko' ? '알레르기 정보' : 'Allergen Info'}
                      </h3>
                      <div className="bg-[#f77f02] p-5 rounded-lg">
                        <p className="text-white font-bold text-lg">
                          {selectedItem.allergens[language]}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 상세 이미지 */}
                  {selectedItem.detailImage && (
                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-[#00512e] uppercase mb-4 tracking-wider flex items-center gap-2">
                        <span>🍴</span> {language === 'ko' ? '상세 정보' : 'Detail Information'}
                      </h3>
                      <div className="bg-[#ede7d9] p-4 rounded-lg">
                        <img
                          src={selectedItem.detailImage}
                          alt={`${selectedItem.name[language]} detail`}
                          className="rounded-lg w-full h-auto"
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 데모 안내 */}
                  <div className="border-t-4 border-[#ede7d9] pt-6">
                    <div className="bg-[#00512e] p-6 rounded-lg text-center">
                      <p className="text-[#ede7d9] font-bold text-lg leading-relaxed">
                        {t.demoNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 안내 문구 */}
          <div className="mt-16 text-center bg-[#00512e] border-8 border-[#f77f02] p-12 max-w-2xl mx-auto relative overflow-hidden">
            <h3 className="text-4xl font-black text-[#f77f02] mb-6 tracking-wider uppercase" style={{ textShadow: '3px 3px 0px #d62829', letterSpacing: '0.05em' }}>
              {t.ctaTitle}
            </h3>
            <p className="text-[#ede7d9] mb-8 leading-relaxed text-xl font-bold">
              {t.ctaDescription}
            </p>
            <Link
              href="/dime"
              className="inline-block bg-[#d62829] hover:bg-[#d62829]/90 text-white text-xl font-black py-5 px-12 tracking-widest transition-all duration-200 uppercase shadow-lg hover:scale-105"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
