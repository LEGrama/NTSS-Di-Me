'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToPrivacy) {
      setMessage({
        type: 'error',
        text: '개인정보 수집·이용에 동의해주세요.',
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setName('');
        setEmail('');
        setAgreedToPrivacy(false);
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-0 py-3 border-0 border-b-2 border-white/30 focus:border-white outline-none transition bg-transparent font-medium text-lg text-white placeholder:text-white/40"
            placeholder="홍길동"
            disabled={isLoading}
          />
        </div>

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

        <div className="mt-6">
          <label className="flex items-start cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToPrivacy}
              onChange={(e) => setAgreedToPrivacy(e.target.checked)}
              disabled={isLoading}
              className="mt-1 w-4 h-4 text-white bg-transparent border-2 border-white/30 rounded focus:ring-white focus:ring-2 cursor-pointer disabled:opacity-50"
            />
            <span className="ml-3 text-sm text-white/80 leading-relaxed">
              <strong className="text-white">(필수)</strong> 개인정보 수집·이용에 동의합니다.
              <br />
              <span className="text-xs text-white/60">
                수집항목: 이름, 이메일 | 이용목적: 서비스 안내 및 마케팅 | 보유기간: 서비스 종료 시까지
              </span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-lg text-[#a60202] font-bold text-lg py-4 px-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none mt-8 tracking-wide"
        >
          {isLoading ? '등록 중...' : '대기명단 등록하기'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 border-2 font-medium text-base ${
            message.type === 'success'
              ? 'bg-white text-[#a60202] border-white'
              : 'bg-[#a60202] text-white border-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
