'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'qrcode';

export default function QRGeneratorPage() {
  const [tableNumber, setTableNumber] = useState('');
  const [branchId, setBranchId] = useState('demo-branch');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!tableNumber) {
      alert('테이블 번호를 입력하세요');
      return;
    }

    const menuUrl = `${window.location.origin}/dime/order-demo?table=${tableNumber}&branch=${branchId}`;

    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, menuUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#00512e',
            light: '#ffffff'
          }
        });

        // 다운로드용 URL 생성
        const url = canvasRef.current.toDataURL();
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error('QR 코드 생성 실패:', error);
      alert('QR 코드 생성에 실패했습니다');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.download = `table-${tableNumber}-qr.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  // 테이블 번호가 변경되면 자동 생성
  useEffect(() => {
    if (tableNumber) {
      generateQRCode();
    }
  }, [tableNumber, branchId]);

  // 빠른 테이블 번호 생성
  const quickTableNumbers = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

  return (
    <main className="min-h-screen bg-[#ede7d9]">
      {/* 헤더 */}
      <div className="bg-[#00512e] border-b-8 border-[#f77f02] p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-[#f77f02] uppercase tracking-wider">
              QR 코드 생성기
            </h1>
            <p className="text-[#ede7d9] text-sm mt-1">테이블별 QR 코드 생성 및 다운로드</p>
          </div>
          <Link
            href="/dime"
            className="bg-white text-[#00512e] px-4 py-2 font-bold hover:bg-[#ede7d9] transition-all uppercase tracking-wider"
          >
            ← 돌아가기
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 입력 폼 */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-[#00512e] p-6">
              <h2 className="text-xl font-black text-[#00512e] uppercase mb-4">테이블 정보</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#00512e] uppercase mb-2">
                    테이블 번호
                  </label>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="예: A1, B2, C3"
                    className="w-full border-4 border-[#00512e] p-3 text-lg font-bold focus:outline-none focus:border-[#f77f02]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#00512e] uppercase mb-2">
                    지점 ID
                  </label>
                  <input
                    type="text"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    placeholder="예: gangnam, hongdae"
                    className="w-full border-4 border-[#00512e] p-3 text-lg font-bold focus:outline-none focus:border-[#f77f02]"
                  />
                </div>
              </div>
            </div>

            {/* 빠른 선택 */}
            <div className="bg-white border-4 border-[#00512e] p-6">
              <h3 className="text-lg font-black text-[#00512e] uppercase mb-4">빠른 선택</h3>
              <div className="grid grid-cols-3 gap-3">
                {quickTableNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setTableNumber(num)}
                    className="bg-[#f77f02] hover:bg-[#f77f02]/90 text-white py-3 font-black uppercase transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* 사용 방법 */}
            <div className="bg-[#00512e] text-[#ede7d9] border-4 border-[#f77f02] p-6">
              <h3 className="text-lg font-black text-[#f77f02] uppercase mb-3">📱 사용 방법</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="font-black">1.</span>
                  <span>테이블 번호를 입력하고 QR 코드 생성</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">2.</span>
                  <span>다운로드 버튼으로 QR 코드 이미지 저장</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">3.</span>
                  <span>인쇄하여 각 테이블에 배치</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">4.</span>
                  <span>고객이 QR 스캔 → 메뉴 선택 → 주문</span>
                </li>
              </ol>
            </div>
          </div>

          {/* QR 코드 미리보기 */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-[#00512e] p-8 flex flex-col items-center">
              <h2 className="text-xl font-black text-[#00512e] uppercase mb-6">QR 코드</h2>

              {!tableNumber ? (
                <div className="w-[300px] h-[300px] bg-[#ede7d9] flex items-center justify-center">
                  <p className="text-[#00512e]/50 font-bold text-center">
                    테이블 번호를<br />입력하세요
                  </p>
                </div>
              ) : (
                <>
                  <canvas
                    ref={canvasRef}
                    className="border-4 border-[#00512e] mb-4"
                  />

                  <div className="text-center mb-4">
                    <div className="text-3xl font-black text-[#00512e] mb-1">
                      테이블 {tableNumber}
                    </div>
                    <div className="text-sm text-[#00512e]/70">
                      {branchId}
                    </div>
                  </div>

                  <button
                    onClick={downloadQRCode}
                    disabled={!qrCodeUrl}
                    className="w-full bg-[#d62829] hover:bg-[#d62829]/90 disabled:bg-gray-300 text-white py-4 font-black uppercase tracking-wider transition-all"
                  >
                    ⬇️ 다운로드
                  </button>
                </>
              )}
            </div>

            {/* 링크 미리보기 */}
            {tableNumber && (
              <div className="bg-white border-4 border-[#00512e] p-6">
                <h3 className="text-lg font-black text-[#00512e] uppercase mb-3">생성된 링크</h3>
                <div className="bg-[#ede7d9] p-4 rounded break-all text-sm font-mono">
                  {typeof window !== 'undefined' &&
                    `${window.location.origin}/dime/order-demo?table=${tableNumber}&branch=${branchId}`}
                </div>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/dime/order-demo?table=${tableNumber}&branch=${branchId}`;
                    navigator.clipboard.writeText(url);
                    alert('링크가 클립보드에 복사되었습니다!');
                  }}
                  className="w-full mt-3 bg-[#00512e] hover:bg-[#00512e]/90 text-white py-2 font-bold uppercase tracking-wider transition-all"
                >
                  📋 링크 복사
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 대시보드 링크 */}
        <div className="mt-8 text-center bg-white border-4 border-[#00512e] p-6">
          <p className="text-[#00512e] font-bold mb-4">
            주문을 확인하려면 매장주 대시보드를 이용하세요
          </p>
          <Link
            href="/dime/dashboard"
            className="inline-block bg-[#00512e] hover:bg-[#00512e]/90 text-white px-8 py-3 font-black uppercase tracking-wider transition-all"
          >
            📊 대시보드 열기
          </Link>
        </div>
      </div>
    </main>
  );
}
