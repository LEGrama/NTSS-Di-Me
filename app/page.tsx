import WaitlistForm from './components/WaitlistForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-black transition-colors">

      <div className="container mx-auto px-4 py-20">
        {/* 헤더 */}
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            음식사진 촬영 &<br />디지털 메뉴판 제작
          </h1>
          <div className="w-16 h-px bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            전문 포토그래퍼가 찍는 고퀄리티 음식 사진과<br />
            매출을 높이는 디지털 메뉴판을 만나보세요
          </p>
        </header>

        {/* 서비스 특징 */}
        <section className="grid md:grid-cols-3 gap-px mb-24 max-w-5xl mx-auto bg-white">
          <div className="bg-black p-10 hover:bg-gray-900 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">전문 촬영</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              음식의 매력을 극대화하는 전문 포토그래퍼의 촬영 서비스
            </p>
          </div>

          <div className="bg-black p-10 hover:bg-gray-900 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
              디지털 메뉴판
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              태블릿이나 모바일에서 보기 좋은 인터랙티브 메뉴판 제작
            </p>
          </div>

          <div className="bg-black p-10 hover:bg-gray-900 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">빠른 작업</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              촬영부터 메뉴판 제작까지 신속하고 효율적인 프로세스
            </p>
          </div>
        </section>

        {/* 대기명단 폼 */}
        <section className="border border-white p-12 md:p-16 max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              얼리버드 대기명단
            </h2>
            <p className="text-gray-400 font-medium">
              서비스 오픈 시 특별 혜택을 받으실 수 있습니다
            </p>
          </div>

          <WaitlistForm />

          <div className="mt-10 text-center text-sm text-gray-400 font-normal">
            <p>이메일은 안전하게 보관되며, 마케팅 용도로만 사용됩니다.</p>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-24 text-center text-gray-500 text-xs font-normal">
          <p>&copy; 2025 음식사진 촬영 & 디지털 메뉴판. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
