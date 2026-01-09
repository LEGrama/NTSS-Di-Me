'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { subscribeToOrders, updateOrderStatus, Order } from '@/lib/firestore';

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [previousOrderCount, setPreviousOrderCount] = useState(0);

  useEffect(() => {
    // 실시간 주문 구독
    const unsubscribe = subscribeToOrders((newOrders) => {
      // 새 주문 알림 소리
      if (soundEnabled && newOrders.length > previousOrderCount) {
        playNotificationSound();
      }
      setPreviousOrderCount(newOrders.length);
      setOrders(newOrders);
    }, statusFilter);

    return () => unsubscribe();
  }, [statusFilter, soundEnabled, previousOrderCount]);

  const playNotificationSound = () => {
    // 간단한 beep 소리
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-[#f77f02] text-white';
      case 'confirmed':
        return 'bg-[#00512e] text-white';
      case 'completed':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '대기중';
      case 'confirmed':
        return '조리중';
      case 'completed':
        return '완료';
      default:
        return status;
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <main className="min-h-screen bg-[#ede7d9]">
      {/* 헤더 */}
      <div className="bg-[#00512e] border-b-8 border-[#f77f02] p-6 sticky top-0 z-10 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-[#f77f02] uppercase tracking-wider">
              주문 관리 대시보드
            </h1>
            <p className="text-[#ede7d9] text-sm mt-1">실시간 주문 현황</p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-4 py-2 font-bold uppercase tracking-wider transition-all ${
                soundEnabled
                  ? 'bg-[#f77f02] text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {soundEnabled ? '🔔 알림 켜짐' : '🔕 알림 꺼짐'}
            </button>
            <Link
              href="/dime"
              className="bg-white text-[#00512e] px-4 py-2 font-bold hover:bg-[#ede7d9] transition-all uppercase tracking-wider"
            >
              ← 돌아가기
            </Link>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-4 border-[#f77f02] p-6">
            <div className="text-sm font-black text-[#00512e] uppercase mb-2">대기중</div>
            <div className="text-4xl font-black text-[#f77f02]">{pendingOrders.length}</div>
          </div>
          <div className="bg-white border-4 border-[#00512e] p-6">
            <div className="text-sm font-black text-[#00512e] uppercase mb-2">조리중</div>
            <div className="text-4xl font-black text-[#00512e]">{confirmedOrders.length}</div>
          </div>
          <div className="bg-white border-4 border-gray-300 p-6">
            <div className="text-sm font-black text-[#00512e] uppercase mb-2">완료</div>
            <div className="text-4xl font-black text-gray-400">{completedOrders.length}</div>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-4 mb-6">
          {['all', 'pending', 'confirmed', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-3 font-black uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-[#d62829] text-white border-4 border-[#00512e]'
                  : 'bg-white text-[#00512e] border-4 border-[#00512e] hover:bg-[#ede7d9]'
              }`}
            >
              {status === 'all' ? '전체' : getStatusLabel(status as Order['status'])}
            </button>
          ))}
        </div>

        {/* 주문 목록 */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white border-4 border-[#00512e] p-12 text-center">
              <p className="text-[#00512e]/50 text-xl font-bold">주문이 없습니다</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border-4 border-[#00512e] p-6 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-black text-[#00512e]">
                        테이블 {order.tableNumber}
                      </span>
                      <span className={`px-4 py-1 text-sm font-black uppercase ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-[#00512e]/70">
                      {order.timestamp?.toDate().toLocaleString('ko-KR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#d62829]">
                      ₩{order.totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* 주문 아이템 */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#ede7d9] p-3 rounded">
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name.ko}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <span className="font-bold text-[#00512e]">{item.name.ko}</span>
                          <span className="text-[#00512e]/70 ml-2">x{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-black text-[#d62829]">
                        ₩{(parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 상태 변경 버튼 */}
                <div className="flex gap-3">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id!, 'confirmed')}
                      className="flex-1 bg-[#00512e] hover:bg-[#00512e]/90 text-white py-3 font-black uppercase tracking-wider transition-all"
                    >
                      조리 시작
                    </button>
                  )}
                  {order.status === 'confirmed' && (
                    <button
                      onClick={() => handleStatusChange(order.id!, 'completed')}
                      className="flex-1 bg-[#00512e] hover:bg-[#00512e]/90 text-white py-3 font-black uppercase tracking-wider transition-all"
                    >
                      서빙 완료
                    </button>
                  )}
                  {order.status === 'completed' && (
                    <div className="flex-1 bg-gray-300 text-gray-600 py-3 font-black uppercase tracking-wider text-center">
                      완료됨
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
