import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#a60202] transition-colors">
      <div className="container mx-auto px-4 py-20">
        {/* 헤더 */}
        <header className="text-center mb-32 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            NTSS
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed mb-4">
            소상공인을 위한 브랜딩 마케팅 인사이트
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
                NTSS는 소상공인과 중소 브랜드의 성장을 돕는 브랜딩 & 마케팅 파트너입니다.
              </p>
              <p>
                대기업처럼 큰 예산이 없어도, 전문 마케팅 팀이 없어도,
                여러분의 브랜드가 빛날 수 있도록 실질적인 인사이트와 솔루션을 제공합니다.
              </p>
              <p>
                우리는 단순히 서비스를 제공하는 것이 아니라,
                여러분의 브랜드 스토리를 함께 만들어갑니다.
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
                  Di Me
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
                얼리버드 대기명단 등록하기
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
              NTSS Di Me 얼리버드 대기명단에 등록하시고,<br />
              특별 혜택과 함께 시작하세요
            </p>
            <Link
              href="/dime"
              className="inline-block bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-[#a60202] font-bold text-lg py-4 px-12 transition-all duration-200"
            >
              Di Me 대기명단 등록하기
            </Link>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-32 text-center text-white/50 text-xs font-normal">
          <p>&copy; 2025 NTSS</p>
        </footer>
      </div>
    </main>
  );
}
