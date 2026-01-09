'use client';

import { useCart } from '@/contexts/CartContext';
import { createOrder } from '@/lib/firestore';
import { useState } from 'react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string | null;
  language: 'ko' | 'en';
}

export default function CartModal({ isOpen, onClose, tableNumber, language }: CartModalProps) {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOrder = async () => {
    if (!tableNumber) {
      alert(language === 'ko' ? '테이블 정보가 없습니다.' : 'Table information is missing.');
      return;
    }

    if (cart.length === 0) {
      alert(language === 'ko' ? '장바구니가 비어있습니다.' : 'Cart is empty.');
      return;
    }

    setIsOrdering(true);

    const result = await createOrder({
      tableNumber,
      branchId: 'demo-branch',
      items: cart,
      totalPrice: getTotalPrice(),
      status: 'pending'
    });

    setIsOrdering(false);

    if (result.success) {
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => {
        setOrderSuccess(false);
        onClose();
      }, 2000);
    } else {
      alert(language === 'ko' ? '주문에 실패했습니다.' : 'Order failed.');
    }
  };

  const translations = {
    ko: {
      title: '장바구니',
      empty: '장바구니가 비어있습니다',
      table: '테이블',
      total: '총 금액',
      order: '주문하기',
      ordering: '주문 중...',
      success: '주문이 완료되었습니다!',
      close: '닫기'
    },
    en: {
      title: 'Cart',
      empty: 'Cart is empty',
      table: 'Table',
      total: 'Total',
      order: 'Place Order',
      ordering: 'Ordering...',
      success: 'Order placed successfully!',
      close: 'Close'
    }
  };

  const t = translations[language];

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-[#00512e] mb-2">{t.success}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-lg max-h-[90vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b-4 border-[#00512e]">
          <h2 className="text-2xl font-black text-[#00512e] uppercase tracking-wider">
            {t.title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#00512e] hover:text-[#d62829] text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 테이블 정보 */}
        {tableNumber && (
          <div className="px-6 py-3 bg-[#ede7d9] border-b-2 border-[#00512e]/20">
            <p className="text-[#00512e] font-bold">
              {t.table}: <span className="text-[#d62829]">{tableNumber}</span>
            </p>
          </div>
        )}

        {/* 장바구니 아이템 */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#00512e]/50 text-lg">{t.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-[#ede7d9] rounded-lg border-2 border-[#00512e]"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name[language]}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-[#00512e] text-lg">
                      {item.name[language]}
                    </h3>
                    <p className="text-[#d62829] font-black text-lg">
                      ₩{item.price}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#d62829] hover:text-[#d62829]/80 text-xl font-bold"
                    >
                      ×
                    </button>
                    <div className="flex items-center gap-2 bg-white rounded border-2 border-[#00512e]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-[#00512e] font-bold hover:bg-[#ede7d9]"
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-[#00512e]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-[#00512e] font-bold hover:bg-[#ede7d9]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 푸터 */}
        {cart.length > 0 && (
          <div className="p-6 border-t-4 border-[#00512e] bg-[#ede7d9]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-black text-[#00512e] uppercase">{t.total}</span>
              <span className="text-3xl font-black text-[#d62829]">
                ₩{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleOrder}
              disabled={isOrdering}
              className="w-full bg-[#d62829] hover:bg-[#d62829]/90 disabled:bg-[#00512e]/50 text-white py-4 font-black text-xl uppercase tracking-wider transition-all"
            >
              {isOrdering ? t.ordering : t.order}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
