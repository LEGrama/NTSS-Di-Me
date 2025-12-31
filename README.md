# 음식사진 촬영 & 디지털 메뉴판 - 대기명단 웹사이트

음식 사진 촬영과 디지털 메뉴판 제작 서비스를 위한 대기명단 등록 웹사이트입니다.

## 주요 기능

- 깔끔하고 반응형 랜딩 페이지
- 대기명단 등록 폼 (이름, 이메일)
- Google Sheets와 자동 연동
- 실시간 이메일 수집

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS v4
- **데이터 저장**: Google Sheets API
- **언어**: TypeScript
- **배포**: Vercel (권장)

## 빠른 시작

### 1. 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example` 파일을 참고하여 `.env.local` 파일을 생성하고 Google API 정보를 입력하세요.

자세한 설정 방법은 [SETUP.md](./SETUP.md) 문서를 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
dimewaitlist/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Google Sheets API 연동
│   ├── components/
│   │   └── WaitlistForm.tsx      # 대기명단 폼 컴포넌트
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # 레이아웃
│   └── page.tsx                  # 메인 페이지
├── .env.local.example            # 환경 변수 예시
├── SETUP.md                      # 상세 설정 가이드
└── package.json
```

## 배포

### Vercel 배포 (권장)

1. GitHub에 코드를 푸시합니다
2. [Vercel](https://vercel.com)에서 프로젝트를 import합니다
3. 환경 변수를 추가합니다
4. 배포합니다

자세한 내용은 [SETUP.md](./SETUP.md)를 참고하세요.

## Google Sheets 데이터 구조

스프레드시트의 첫 번째 행은 다음과 같이 설정하세요:

| A (등록 시간) | B (이름) | C (이메일) |
|--------------|---------|-----------|
| 2025-01-01 10:30 | 홍길동 | hong@example.com |

## 커스터마이징

### 디자인 변경
- [app/page.tsx](./app/page.tsx): 랜딩 페이지 내용 수정
- [app/components/WaitlistForm.tsx](./app/components/WaitlistForm.tsx): 폼 디자인 수정
- [app/globals.css](./app/globals.css): 전역 스타일 수정

### 수집 필드 추가
1. [app/components/WaitlistForm.tsx](./app/components/WaitlistForm.tsx)에 입력 필드 추가
2. [app/api/waitlist/route.ts](./app/api/waitlist/route.ts)에서 Google Sheets 저장 로직 수정

## 라이선스

MIT

## 문의

문제가 발생하면 이슈를 등록해주세요.
