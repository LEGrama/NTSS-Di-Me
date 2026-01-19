'use client';

import Link from 'next/link';

export default function CustomProductPage() {
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
            <div className="inline-block bg-white text-[#a60202] text-sm font-bold px-4 py-1 mb-4">
              RECOMMENDED
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              커스텀 디자인
            </h1>
            <p className="text-xl text-white/90 font-medium">
              브랜드에 완벽하게 맞춘 프리미엄 솔루션
            </p>
          </header>

          {/* 메인 이미지 영역 - 반응형 */}
          <div className="mb-12">
            <div className="bg-white/10 border-2 border-white p-4">
              {/* 웹: 860px 고정, 모바일: 100% */}
              <div
                className="w-full mx-auto bg-white/5 flex items-center justify-center"
                style={{
                  maxWidth: '860px',
                  aspectRatio: '860/1200' // 예시 비율
                }}
              >
                <div className="text-center text-white/50">
                  <p className="text-sm mb-2">이미지 영역</p>
                  <p className="text-xs">웹: 860px / 모바일: 100%</p>
                </div>
              </div>
            </div>
          </div>

          {/* 제품 설명 */}
          <div className="border-2 border-white bg-white p-8 md:p-12 mb-8">
            <h2 className="text-3xl font-bold text-[#a60202] mb-6">제품 특징</h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">전문 촬영 포함</h3>
                <p className="text-[#a60202]/80 leading-relaxed">
                  전문 포토그래퍼가 귀하의 메뉴를 최상의 모습으로 촬영합니다.
                  음식의 매력을 극대화하는 고품질 이미지를 제공합니다.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">브랜드 맞춤 디자인</h3>
                <p className="text-[#a60202]/80 leading-relaxed mb-3">
                  귀하의 브랜드 아이덴티티에 완벽하게 맞춘 디자인을 제작합니다.
                </p>
                <ul className="space-y-2 text-[#a60202]/80">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>브랜드 컬러 및 로고 적용</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>맞춤형 레이아웃 디자인</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>폰트 및 스타일 커스터마이징</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>다국어 지원 (한국어/영어/기타)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">프리미엄 기능</h3>
                <ul className="space-y-2 text-[#a60202]/80">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>무제한 메뉴 수정 및 업데이트</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>실시간 주문 시스템 통합</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>주문 현황 대시보드</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>고객 데이터 분석</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>우선 기술 지원</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">적합한 경우</h3>
                <ul className="space-y-2 text-[#a60202]/80">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>브랜드 이미지가 중요한 프리미엄 레스토랑</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>주문 시스템까지 통합하고 싶은 경우</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>고품질 비주얼 콘텐츠가 필요한 경우</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>장기적인 브랜딩 전략을 가진 비즈니스</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#a60202] mb-2">제작 프로세스</h3>
                <div className="space-y-3 text-[#a60202]/80">
                  <div className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <div>
                      <strong>상담 및 기획</strong>
                      <p className="text-sm">브랜드 분석 및 요구사항 파악</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <div>
                      <strong>전문 촬영</strong>
                      <p className="text-sm">메뉴 사진 촬영 및 편집</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <div>
                      <strong>디자인 제작</strong>
                      <p className="text-sm">브랜드 맞춤 디자인 및 개발</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-bold">4.</span>
                    <div>
                      <strong>테스트 및 론칭</strong>
                      <p className="text-sm">최종 검수 후 서비스 시작</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#a60202]/20 pt-6">
              <p className="text-[#a60202]/60 text-sm mb-4">
                * 상세한 가격과 일정은 상담을 통해 안내드립니다
              </p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <Link
              href="/dime"
              className="inline-block bg-white hover:bg-gray-100 hover:scale-105 text-[#a60202] font-bold text-lg py-4 px-12 transition-all duration-200 shadow-lg mb-3"
            >
              대기명단 등록하고 상담받기 →
            </Link>
            <p className="text-white/70 text-sm">
              등록하시면 1:1 맞춤 상담을 받으실 수 있습니다
            </p>
          </div>

          {/* 추가 정보 */}
          <div className="mt-12 text-center">
            <Link
              href="/dime/order-demo"
              className="inline-block text-white hover:underline text-sm"
            >
              주문 시스템 데모 보기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
