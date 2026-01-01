import WaitlistForm from '../components/WaitlistForm';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#a60202] transition-colors">
      {/* 홈 아이콘 */}
      <Link href="/" className="fixed top-6 left-6 z-50 hover:opacity-80 transition">
        <Image src="/icon.jpeg" alt="NTSS Home" width={48} height={48} className="rounded-lg object-cover w-12 h-12" />
      </Link>

      <div className="container mx-auto px-4 py-20">
        {/* 헤더 */}
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            NTSS Di Me
          </h1>
          <div className="w-16 h-px bg-white mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            F&B 전문 비주얼 브랜딩 스튜디오
          </p>
        </header>

        {/* 서비스 특징 */}
        <section className="grid md:grid-cols-3 gap-px mb-24 max-w-5xl mx-auto bg-white">
          <div className="bg-[#a60202] p-10 hover:bg-[#8a0101] transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">전문 촬영</h3>
            <p className="text-white/80 font-medium leading-relaxed">
              음식의 매력을 극대화하는 전문 포토그래퍼의 촬영 서비스
            </p>
          </div>

          <div className="bg-[#a60202] p-10 hover:bg-[#8a0101] transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
              디지털 메뉴판
            </h3>
            <p className="text-white/80 font-medium leading-relaxed">
              태블릿이나 모바일에서 보기 좋은 인터랙티브 메뉴판 제작
            </p>
          </div>

          <div className="bg-[#a60202] p-10 hover:bg-[#8a0101] transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">빠른 작업</h3>
            <p className="text-white/80 font-medium leading-relaxed">
              촬영부터 메뉴판 제작까지 신속하고 효율적인 프로세스
            </p>
          </div>
        </section>

        {/* 대기명단 폼 */}
        <section className="border-2 border-white p-12 md:p-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              JOIN THE WAITLIST
            </h2>
          </div>

          <WaitlistForm />

          <div className="mt-10 text-center text-sm text-white/70 font-normal">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-block text-white hover:underline font-medium"
              >
                ← NTSS 홈으로
              </Link>
              <span className="hidden sm:inline text-white/50">|</span>
              <Link
                href="/dime/menu-demo"
                className="inline-block text-white hover:underline font-medium"
              >
                디지털 메뉴판 데모 보기 →
              </Link>
              <span className="hidden sm:inline text-white/50">|</span>
              <Link
                href="/dime/check"
                className="inline-block text-white hover:underline font-medium"
              >
                내 대기번호 확인하기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-24 text-center text-white/50 text-xs font-normal">
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
          <p>&copy; 2025 NTSS Di Me</p>
        </footer>
      </div>
    </main>
  );
}
