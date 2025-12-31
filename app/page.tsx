import WaitlistForm from './components/WaitlistForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            음식사진 촬영 &<br />디지털 메뉴판 제작
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            전문 포토그래퍼가 찍는 고퀄리티 음식 사진과<br />
            매출을 높이는 디지털 메뉴판을 만나보세요
          </p>
        </header>

        {/* 서비스 특징 */}
        <section className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">전문 촬영</h3>
            <p className="text-gray-600">
              음식의 매력을 극대화하는 전문 포토그래퍼의 촬영 서비스
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">
              디지털 메뉴판
            </h3>
            <p className="text-gray-600">
              태블릿이나 모바일에서 보기 좋은 인터랙티브 메뉴판 제작
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">빠른 작업</h3>
            <p className="text-gray-600">
              촬영부터 메뉴판 제작까지 신속하고 효율적인 프로세스
            </p>
          </div>
        </section>

        {/* 대기명단 폼 */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              얼리버드 대기명단
            </h2>
            <p className="text-gray-600">
              서비스 오픈 시 특별 혜택을 받으실 수 있습니다
            </p>
          </div>

          <WaitlistForm />

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>이메일은 안전하게 보관되며, 마케팅 용도로만 사용됩니다.</p>
          </div>
        </section>

        {/* 푸터 */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>&copy; 2025 음식사진 촬영 & 디지털 메뉴판. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
