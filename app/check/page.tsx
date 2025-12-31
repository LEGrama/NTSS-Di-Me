'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function CheckPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    waitlistNumber: number;
    name: string;
    registeredDate: string;
    totalWaitlist: number;
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
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-block text-gray-400 hover:text-white mb-8 transition"
          >
            ← 홈으로 돌아가기
          </Link>

          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              대기번호 조회
            </h1>
            <p className="text-gray-400 font-medium">
              등록하신 이메일을 입력하시면 대기번호를 확인하실 수 있습니다
            </p>
          </header>

          <div className="border border-white p-12 md:p-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider"
                >
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-600 focus:border-white outline-none transition bg-transparent font-medium text-lg text-white placeholder:text-gray-500"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg py-4 px-6 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8 tracking-wide"
              >
                {isLoading ? '조회 중...' : '대기번호 조회하기'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 border-2 border-white bg-white text-black font-medium text-base">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-8 border-2 border-white bg-black text-white">
                <div className="text-center">
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                    {result.name}님의 대기번호
                  </p>
                  <p className="text-6xl font-bold mb-4">{result.waitlistNumber}번</p>
                  <div className="w-16 h-px bg-white mx-auto mb-4"></div>
                  <p className="text-gray-400 text-sm">
                    전체 대기자: {result.totalWaitlist}명
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    등록일시: {result.registeredDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>대기명단에 등록하지 않으셨나요?</p>
            <Link href="/" className="text-white hover:underline mt-2 inline-block">
              지금 등록하기 →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
