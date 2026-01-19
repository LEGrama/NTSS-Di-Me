'use client';

import Link from 'next/link';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#a60202]">
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

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/dime"
            className="inline-block text-white/70 hover:text-white mb-8 transition"
          >
            ← NTSS Di Me로 돌아가기
          </Link>

          {/* 헤더 */}
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              제품 선택
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
              귀하의 비즈니스에 맞는 최적의 솔루션을 선택하세요
            </p>
          </header>

          {/* 제품 카드 */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* 트라이얼 제품 */}
            <Link
              href="/dime/products/trial"
              className="border-2 border-white p-12 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  트라이얼
                </h2>
                <p className="text-white/80 font-medium leading-relaxed">
                  빠르게 시작하고 싶으신가요?<br />
                  기본 템플릿으로 바로 시작하세요
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <span className="text-white">✓</span>
                  <span className="text-white/80">빠른 시작 (1-2일 내)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">✓</span>
                  <span className="text-white/80">기본 템플릿 제공</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">✓</span>
                  <span className="text-white/80">QR 코드 생성</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white">✓</span>
                  <span className="text-white/80">기본 메뉴 관리</span>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-block bg-white text-[#a60202] font-bold px-6 py-3 group-hover:scale-105 transition-transform">
                  자세히 보기 →
                </span>
              </div>
            </Link>

            {/* 커스텀 디자인 제품 */}
            <Link
              href="/dime/products/custom"
              className="border-2 border-white bg-white p-12 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="text-center mb-6">
                <div className="inline-block bg-[#a60202] text-white text-xs font-bold px-3 py-1 mb-4">
                  RECOMMENDED
                </div>
                <h2 className="text-3xl font-bold text-[#a60202] mb-4 tracking-tight">
                  커스텀 디자인
                </h2>
                <p className="text-[#a60202]/80 font-medium leading-relaxed">
                  브랜드에 완벽하게 맞춘<br />
                  맞춤형 디지털 메뉴판
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2">
                  <span className="text-[#a60202]">✓</span>
                  <span className="text-[#a60202]/80">전문 촬영 포함</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#a60202]">✓</span>
                  <span className="text-[#a60202]/80">브랜드 맞춤 디자인</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#a60202]">✓</span>
                  <span className="text-[#a60202]/80">무제한 메뉴 수정</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#a60202]">✓</span>
                  <span className="text-[#a60202]/80">우선 지원</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#a60202]">✓</span>
                  <span className="text-[#a60202]/80">주문 시스템 통합</span>
                </div>
              </div>

              <div className="text-center">
                <span className="inline-block bg-[#a60202] text-white font-bold px-6 py-3 group-hover:scale-105 transition-transform">
                  자세히 보기 →
                </span>
              </div>
            </Link>
          </div>

          {/* 하단 안내 */}
          <div className="text-center text-white/70 text-sm">
            <p>어떤 제품이 적합한지 잘 모르겠나요?</p>
            <Link href="/dime" className="text-white hover:underline mt-2 inline-block font-medium">
              대기명단에 등록하고 상담받기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
