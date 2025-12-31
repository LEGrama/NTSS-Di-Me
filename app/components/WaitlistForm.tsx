'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-[#a60202] outline-none transition bg-transparent font-medium text-lg text-gray-900 placeholder:text-gray-400"
            placeholder="홍길동"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-[#a60202] outline-none transition bg-transparent font-medium text-lg text-gray-900 placeholder:text-gray-400"
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#a60202] hover:bg-[#8a0101] text-white font-bold text-lg py-4 px-6 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8 tracking-wide"
        >
          {isLoading ? '등록 중...' : '대기명단 등록하기'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-6 p-4 border-2 font-medium text-base ${
            message.type === 'success'
              ? 'bg-[#a60202] text-white border-[#a60202]'
              : 'bg-white text-[#a60202] border-[#a60202]'
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
