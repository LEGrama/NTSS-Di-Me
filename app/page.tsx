import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#a60202] transition-colors">
      <div className="container mx-auto px-4 py-20">
        {/* 홈 아이콘 */}
        <Link href="/" className="fixed top-6 left-6 z-50 hover:opacity-80 transition">
          <Image src="/ntss.svg" alt="NTSS Home" width={48} height={48} className="rounded-lg w-12 h-12" unoptimized priority />
        </Link>

        {/* 헤더 */}
        <header className="text-center mb-32 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            NTSS
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
            소상공인을 위한 브랜딩 연구소
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
            작은 브랜드가 큰 꿈을 이루도록, NTSS가 함께합니다
          </p>
        </header>

        {/* About NTSS */}
        <section className="max-w-4xl mx-auto mb-32">
          <div className="border-2 border-white p-12 md:p-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
              About NTSS
            </h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                NTSS는 ‘Not So Small’의 약자로 소상공인이 브랜드로 성장하는 것을 도모하는 커뮤니티입니다. 
              </p>
              <p>
                NTSS의 연구매거진 &lt;낫쏘스몰브랜딩랩&gt;은 매주 화・목・토 인스타그램에 업로드됩니다. 팔로우하고, 브랜딩 전략, 최신 트렌드 이슈, 비즈니스 스토리 등 전사업을 아우르는 인사이트를 키워가세요.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto mb-32">
          <h2 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-white">
            <Link
              href="/dime"
              className="bg-[#a60202] p-12 hover:bg-[#8a0101] transition-all duration-200 hover:scale-[1.02] group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  NTSS Di Me
                </h3>
                <span className="text-white/70 group-hover:text-white transition">→</span>
              </div>
              <p className="text-white/80 font-medium leading-relaxed mb-4">
                F&B 전문 비주얼 브랜딩 스튜디오
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                음식의 매력을 극대화하는 전문 촬영과 디지털 메뉴판 제작 서비스
              </p>
              <div className="mt-6 inline-block text-white/80 group-hover:text-white font-semibold text-sm">
                대기명단 등록하기
              </div>
            </Link>

            <div className="bg-[#a60202] p-12 opacity-50 cursor-not-allowed">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  More Services
                </h3>
                <span className="text-white/50">🔒</span>
              </div>
              <p className="text-white/60 font-medium leading-relaxed">
                곧 공개될 다양한 브랜딩 솔루션들
              </p>
              <div className="mt-6 inline-block text-white/50 font-semibold text-sm">
                Coming Soon
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto text-center mb-32">
          <div className="border-2 border-white p-12">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
              함께 성장하고 싶으신가요?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              NTSS Di Me 대기명단에 등록하시고,<br />
              특별 혜택과 함께 시작하세요
            </p>
            <Link
              href="/dime"
              className="inline-block bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-[#a60202] font-bold text-lg py-4 px-12 transition-all duration-200"
            >
              NTSS Di Me 대기명단 등록하기
            </Link>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-32 text-center text-white/50 text-xs font-normal">
          <div className="mb-4">
            <a
              href="https://instagram.com/ntsslab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @ntsslab
            </a>
          </div>
          <p>&copy; 2025 NTSS</p>
        </footer>
      </div>
    </main>
  );
}
