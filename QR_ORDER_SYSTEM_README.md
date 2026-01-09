# QR 코드 주문 시스템

Firebase 기반 실시간 QR 코드 주문 시스템입니다.

## 🚀 주요 기능

### 1. 고객용 메뉴판 (`/dime/order-demo`)
- QR 코드 스캔으로 접속 (테이블 정보 포함)
- 메뉴 선택 및 장바구니 담기
- 실시간 주문하기
- 한국어/영어 지원

### 2. 매장주 대시보드 (`/dime/dashboard`)
- 실시간 주문 현황 모니터링
- 주문 상태 관리 (대기중 → 조리중 → 완료)
- 테이블별 주문 내역 확인
- 새 주문 알림 소리

### 3. QR 코드 생성기 (`/dime/qr-generator`)
- 테이블별 QR 코드 생성
- QR 코드 다운로드 (PNG)
- 링크 미리보기 및 복사

## 📋 설치 및 설정

### 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 새 프로젝트 생성
3. **Firestore Database** 활성화
   - 빌드 → Firestore Database → 데이터베이스 만들기
   - **테스트 모드**로 시작 (개발용)
   - 위치: asia-northeast3 (서울) 선택

4. **웹 앱 추가**
   - 프로젝트 설정 → 일반 → 앱 추가 → 웹
   - 앱 닉네임 입력
   - Firebase SDK 구성 값 확인

### 2. 환경 변수 설정

```bash
# .env.local.example을 .env.local로 복사
cp .env.local.example .env.local

# .env.local 파일을 열어서 Firebase 프로젝트 값으로 변경
```

`.env.local` 파일 예시:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. 의존성 설치 및 실행

```bash
# 의존성이 이미 설치되어 있습니다
npm install

# 개발 서버 실행
npm run dev
```

## 🎯 사용 방법

### Step 1: QR 코드 생성

1. 브라우저에서 `http://localhost:3000/dime/qr-generator` 접속
2. 테이블 번호 입력 (예: A1, B2, C3)
3. QR 코드 다운로드
4. 인쇄하여 각 테이블에 배치

### Step 2: 고객 주문

1. 고객이 QR 코드 스캔
2. 메뉴판 페이지 자동 열림 (테이블 정보 포함)
3. 메뉴 선택 후 "담기" 버튼 클릭
4. 하단 장바구니 바에서 "장바구니 보기" 클릭
5. 수량 조절 후 "주문하기" 버튼 클릭
6. 주문 완료!

### Step 3: 매장주 주문 확인

1. 브라우저에서 `http://localhost:3000/dime/dashboard` 접속
2. 실시간으로 새 주문 확인 (알림 소리 포함)
3. "조리 시작" 버튼으로 상태 변경
4. "서빙 완료" 버튼으로 주문 완료 처리

## 📁 파일 구조

```
├── lib/
│   ├── firebase.ts          # Firebase 초기화
│   └── firestore.ts         # Firestore 헬퍼 함수
├── contexts/
│   └── CartContext.tsx      # 장바구니 Context
├── components/
│   ├── CartBar.tsx          # 하단 장바구니 바
│   └── CartModal.tsx        # 장바구니 모달
├── app/
│   └── dime/
│       ├── menu-demo/       # 고객용 메뉴판
│       ├── dashboard/       # 매장주 대시보드
│       └── qr-generator/    # QR 코드 생성기
└── .env.local.example       # 환경 변수 예제
```

## 🗄️ 데이터베이스 구조

### Firestore Collection: `orders`

```typescript
{
  tableNumber: "A1",           // 테이블 번호
  branchId: "demo-branch",     // 지점 ID
  items: [                     // 주문 아이템
    {
      id: 1,
      name: { ko: "피쉬 타코", en: "Fish Taco" },
      price: "12,000",
      quantity: 2,
      image: "/menu/fish-taco.jpg"
    }
  ],
  totalPrice: 24000,           // 총 금액
  status: "pending",           // pending | confirmed | completed
  timestamp: Timestamp         // 주문 시간
}
```

## 🔗 주요 URL

- **메뉴판**: `http://localhost:3000/dime/order-demo?table=A1`
- **대시보드**: `http://localhost:3000/dime/dashboard`
- **QR 생성**: `http://localhost:3000/dime/qr-generator`

## ⚙️ 커스터마이징

### 메뉴 아이템 수정

`app/dime/order-demo/page.tsx` 파일의 `menuItems` 배열을 수정하세요.

### 색상 변경

멕시칸 테마 색상:
- `#ede7d9` - 베이지 (배경)
- `#00512e` - 다크 그린 (헤더, 테두리)
- `#f77f02` - 오렌지 (액센트)
- `#d62829` - 레드 (CTA, 가격)

### 지점 추가

`app/dime/qr-generator/page.tsx`에서 `branchId` 값을 변경하여 여러 지점을 관리할 수 있습니다.

## 🐛 트러블슈팅

### Firebase 연결 오류

```
Error: Firebase: Error (auth/invalid-api-key)
```

→ `.env.local` 파일의 Firebase 설정값이 올바른지 확인하세요.

### QR 코드가 생성되지 않음

→ `qrcode` 패키지가 설치되었는지 확인: `npm install qrcode @types/qrcode`

### 실시간 업데이트가 안됨

→ Firestore 보안 규칙이 테스트 모드로 설정되었는지 확인하세요.

## 📝 다음 단계

- [ ] 프로덕션용 Firestore 보안 규칙 설정
- [ ] 인증 시스템 추가 (매장주 로그인)
- [ ] 주문 통계 및 분석 기능
- [ ] 푸시 알림 (Firebase Cloud Messaging)
- [ ] 결제 시스템 통합

## 🎨 디자인

현재 멕시칸 레스토랑 테마로 디자인되어 있으며, 다른 브랜드에 맞게 쉽게 커스터마이징할 수 있습니다.

## 📞 문의

문제가 있거나 질문이 있으시면 이슈를 생성해주세요!
