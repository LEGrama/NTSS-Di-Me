'use client';

import { useCart } from '@/contexts/CartContext';

interface CartBarProps {
  onClick: () => void;
  language: 'ko' | 'en';
}

export default function CartBar({ onClick, language }: CartBarProps) {
  const { getTotalItems, getTotalPrice } = useCart();

  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  const translations = {
    ko: {
      viewCart: '장바구니 보기',
      items: '개'
    },
    en: {
      viewCart: 'View Cart',
      items: 'items'
    }
  };

  const t = translations[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
      <button
        onClick={onClick}
        className="w-full max-w-4xl mx-auto bg-[#d62829] hover:bg-[#d62829]/90 text-white py-4 px-6 font-black text-lg uppercase tracking-wider transition-all shadow-2xl flex items-center justify-between pointer-events-auto border-4 border-[#00512e]"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white text-[#d62829] w-8 h-8 rounded-full flex items-center justify-center font-black">
            {totalItems}
          </div>
          <span>{t.viewCart}</span>
        </div>
        <span className="text-2xl">₩{getTotalPrice().toLocaleString()}</span>
      </button>
    </div>
  );
}
