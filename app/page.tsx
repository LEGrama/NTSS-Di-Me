import WaitlistForm from './components/WaitlistForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#a60202] transition-colors">

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
                href="/menu-demo"
                className="inline-block text-white hover:underline font-medium"
              >
                디지털 메뉴판 데모 보기 →
              </Link>
              <span className="hidden sm:inline text-white/50">|</span>
              <Link
                href="/check"
                className="inline-block text-white hover:underline font-medium"
              >
                내 대기번호 확인하기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-24 text-center text-white/50 text-xs font-normal">
          <p>&copy; 2025 NTSS Di Me</p>
        </footer>
      </div>
    </main>
  );
}
