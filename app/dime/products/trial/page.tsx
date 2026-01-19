'use client';

import Link from 'next/link';

export default function TrialProductPage() {
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
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dime/products"
            className="inline-block text-white/70 hover:text-white mb-8 transition"
          >
            ← 제품 목록으로
          </Link>

          {/* 제품 헤더 */}
          <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              트라이얼
            </h1>
            <p className="text-xl text-white/90 font-medium">
              빠르게 시작하는 디지털 메뉴판
            </p>
          </header>

          {/* 메인 이미지 영역 */}
          <div className="mb-12">
            <div className="bg-white/10 border-2 border-white p-4">
              {/* 860px 이미지가 들어갈 영역 */}
              <div className="w-full bg-white/5 flex items-center justify-center"
                style={{
                  aspectRatio: '860/1200' // 예시 비율
                }}
              >
                <div className="text-center text-white/50">
                  <p className="text-sm mb-2">이미지 영역</p>
                  <p className="text-xs">860px × 가변 높이</p>
                </div>
              </div>
            </div>
          </div>

          {/* 제품 설명 */}
          <div className="border-2 border-white p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">제품 특징</h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">빠른 시작</h3>
                <p className="text-white/80 leading-relaxed">
                  준비된 템플릿으로 1-2일 내에 바로 시작할 수 있습니다. 복잡한 설정 없이 메뉴만 입력하면 완성됩니다.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">기본 기능</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>디지털 메뉴판 (모바일/태블릿 최적화)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>QR 코드 자동 생성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>기본 메뉴 관리 시스템</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>3가지 템플릿 중 선택</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">적합한 경우</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>빠르게 디지털 메뉴판을 도입하고 싶은 경우</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>예산이 제한적인 경우</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>기본 기능만으로 충분한 경우</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-white/20 pt-6">
              <p className="text-white/60 text-sm mb-4">
                * 상세한 가격과 기능은 상담을 통해 안내드립니다
              </p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <Link
              href="/dime"
              className="inline-block bg-white hover:bg-gray-100 hover:scale-105 text-[#a60202] font-bold text-lg py-4 px-12 transition-all duration-200 shadow-lg"
            >
              대기명단 등록하기 →
            </Link>
            <p className="text-white/70 text-sm mt-4">
              등록하시면 상세한 안내를 받으실 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
