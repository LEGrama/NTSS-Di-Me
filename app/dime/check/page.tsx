'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    waitlistNumber: number;
    name: string;
    registeredDate: string;
    totalWaitlist: number;
    status: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#a60202]">
      {/* 홈 아이콘 */}
      <Link href="/" className="fixed top-6 left-6 z-50 hover:opacity-80 transition">
        <Image src="/ntss.svg" alt="NTSS Home" width={48} height={48} className="rounded-lg w-12 h-12" />
      </Link>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/dime"
            className="inline-block text-white/70 hover:text-white mb-8 transition"
          >
            ← NTSS Di Me로 돌아가기
          </Link>

          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              대기번호 조회
            </h1>
            <p className="text-white/80 font-medium">
              등록하신 이메일을 입력하시면 대기번호를 확인하실 수 있습니다
            </p>
          </header>

          <div className="border-2 border-white p-12 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-white/30 focus:border-white outline-none transition bg-transparent font-medium text-lg text-white placeholder:text-white/40"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-[#a60202] font-bold text-lg py-4 px-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-8 tracking-wide"
              >
                {isLoading ? '조회 중...' : '대기번호 조회하기'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 border-2 border-white bg-[#a60202] text-white font-medium text-base">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-8 border-2 border-white bg-white text-[#a60202]">
                <div className="text-center">
                  <p className="text-[#a60202]/70 text-sm font-semibold uppercase tracking-wider mb-2">
                    {result.name}님의 현재 상태
                  </p>
                  <p className="text-6xl font-bold mb-4">
                    {result.status === '미완료' ? '대기 중' : result.status === '진행중' ? '진행 중' : '완료'}
                  </p>
                  <div className="w-16 h-px bg-[#a60202] mx-auto mb-4"></div>
                  {/* 대기번호 주석 처리 - 필요시 주석 해제하여 사용 가능
                  <p className="text-[#a60202]/70 text-sm">
                    대기번호: {result.waitlistNumber}번
                  </p>
                  <p className="text-[#a60202]/70 text-sm">
                    전체 대기자: {result.totalWaitlist}명
                  </p>
                  */}
                  <p className="text-[#a60202]/50 text-xs mt-2">
                    등록일시: {result.registeredDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-white/70">
            <p>대기명단에 등록하지 않으셨나요?</p>
            <Link href="/dime" className="text-white hover:underline mt-2 inline-block">
              지금 등록하기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
