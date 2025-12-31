# 대기명단 웹사이트 설정 가이드

이 가이드는 Google Sheets API를 연동하여 대기명단 웹사이트를 설정하는 방법을 설명합니다.

## 1. Google Cloud 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속합니다
2. 새 프로젝트를 생성합니다
3. 프로젝트 이름을 입력하고 생성합니다

## 2. Google Sheets API 활성화

1. Google Cloud Console에서 "API 및 서비스" > "라이브러리"로 이동합니다
2. "Google Sheets API"를 검색합니다
3. "사용 설정" 버튼을 클릭합니다

## 3. Service Account 생성

1. "API 및 서비스" > "사용자 인증 정보"로 이동합니다
2. "사용자 인증 정보 만들기" > "서비스 계정"을 선택합니다
3. 서비스 계정 정보를 입력합니다:
   - 이름: `waitlist-service`
   - ID: 자동 생성됨
   - 설명: "대기명단 웹사이트용 서비스 계정"
4. "완료"를 클릭합니다

## 4. Service Account 키 생성

1. 생성된 서비스 계정을 클릭합니다
2. "키" 탭으로 이동합니다
3. "키 추가" > "새 키 만들기"를 클릭합니다
4. "JSON" 형식을 선택하고 "만들기"를 클릭합니다
5. JSON 파일이 자동으로 다운로드됩니다 (안전하게 보관하세요!)

## 5. Google Sheets 생성 및 설정

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트를 생성합니다
2. **중요: 시트 이름 변경**
   - 스프레드시트 하단의 탭 이름이 "시트1"로 되어 있다면 "Sheet1"로 변경하세요
   - 탭을 우클릭 > "이름 바꾸기" > "Sheet1" 입력
   - 또는 코드에서 `Sheet1`을 `시트1`로 변경해도 됩니다
3. 첫 번째 행에 헤더를 추가합니다:
   - A1: `등록 시간`
   - B1: `이름`
   - C1: `이메일`
4. 스프레드시트 URL에서 ID를 복사합니다:
   ```
   https://docs.google.com/spreadsheets/d/[여기가 SPREADSHEET_ID]/edit
   ```
5. 스프레드시트를 서비스 계정과 공유합니다:
   - "공유" 버튼 클릭
   - 다운로드한 JSON 파일의 `client_email` 값을 복사해서 추가
   - 권한을 "편집자"로 설정
   - "전송" 클릭

## 6. 환경 변수 설정

1. 프로젝트 루트의 `.gitignore` 파일에 `.env*.local`이 포함되어 있는지 확인합니다
2. 프로젝트 루트에 `.env.local` 파일을 생성합니다
3. 다운로드한 JSON 파일을 열어 다음 값을 복사합니다:

```bash
# Google Service Account 이메일
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Google Service Account Private Key
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n여기에 private_key 값을 붙여넣기\n-----END PRIVATE KEY-----\n"

# Google Sheets ID
GOOGLE_SHEET_ID=your-spreadsheet-id-here
```

**주의사항:**
- `GOOGLE_PRIVATE_KEY`는 따옴표로 감싸야 합니다
- `\n`은 그대로 유지해야 합니다
- JSON 파일의 `private_key` 값을 복사할 때 이스케이프 문자(`\n`)를 그대로 복사하세요
- 코드에서는 자동으로 `replace(/\\n/g, '\n')`를 사용하여 실제 줄바꿈으로 변환합니다

## 7. 필수 패키지 설치 및 실행

```bash
# 필수 패키지 설치 (이미 설치되어 있으면 생략 가능)
npm install googleapis

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 8. Vercel에 배포하기

1. [Vercel](https://vercel.com)에 가입/로그인합니다
2. GitHub 저장소와 연결합니다
3. 프로젝트를 import합니다
4. "Environment Variables" 섹션에서 `.env.local`의 모든 변수를 추가합니다:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
5. "Deploy" 버튼을 클릭합니다

## 9. 테스트

1. 웹사이트에 접속합니다
2. 이름과 이메일을 입력하고 제출합니다
3. Google Sheets에서 데이터가 추가되었는지 확인합니다

## 문제 해결

### API 오류가 발생하는 경우
- Google Sheets API가 활성화되어 있는지 확인
- Service Account가 스프레드시트에 편집자 권한으로 공유되어 있는지 확인
- 환경 변수가 올바르게 설정되어 있는지 확인

### Private Key 오류
- `GOOGLE_PRIVATE_KEY`에 따옴표가 있는지 확인
- `\n` 이스케이프 문자가 유지되고 있는지 확인
- JSON에서 복사한 전체 키 값이 포함되어 있는지 확인
- Vercel 배포 시: 환경 변수에 입력할 때 `\n`을 그대로 입력하세요 (코드에서 자동 변환됨)

**코드 확인:**
API 라우트에서 Private Key를 다음과 같이 처리하는지 확인하세요:
```javascript
private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
```

### 데이터가 저장되지 않는 경우
- 스프레드시트 ID가 올바른지 확인
- **가장 흔한 원인: Sheet 이름 불일치**
  - 스프레드시트 하단 탭 이름이 "Sheet1"인지 확인 (한국어 시트는 기본값이 "시트1"입니다)
  - 코드의 범위 설정 (`Sheet1!A:C`)과 실제 시트 이름이 일치하는지 확인
- Service Account 이메일이 스프레드시트에 "편집자" 권한으로 공유되었는지 확인
- 브라우저 콘솔 (F12)과 서버 터미널 로그를 확인

### "Range not found" 오류
- 이 오류는 시트 이름이 일치하지 않을 때 발생합니다
- 해결 방법:
  1. 스프레드시트 하단 탭 이름을 "Sheet1"로 변경, 또는
  2. 코드에서 `range: 'Sheet1!A:C'`를 `range: '시트1!A:C'`로 변경

## 추가 기능 아이디어

- 이메일 자동 응답 (SendGrid, Resend 등)
- 관리자 대시보드
- 중복 이메일 체크
- reCAPTCHA 추가
- 분석 도구 연동 (Google Analytics)

## 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- `.gitignore` 파일에 `.env*.local`이 포함되어 있는지 반드시 확인하세요
- Service Account JSON 파일을 안전하게 보관하세요
- 프로덕션 환경에서는 환경 변수를 Vercel/호스팅 서비스에 안전하게 저장하세요

## API 권한 범위 (Scopes)

코드에서 사용하는 Google API 권한:
```javascript
scopes: ['https://www.googleapis.com/auth/spreadsheets']
```

이 권한은 스프레드시트 읽기/쓰기를 허용합니다.
