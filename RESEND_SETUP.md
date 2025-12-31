# Resend 이메일 자동 발송 설정 가이드

이 가이드는 Resend를 사용하여 대기명단 등록 시 자동으로 확인 이메일을 발송하는 방법을 설명합니다.

## 1. Resend 계정 생성

1. [Resend 웹사이트](https://resend.com)에 접속합니다
2. "Sign Up" 버튼을 클릭하여 계정을 생성합니다
3. 이메일 인증을 완료합니다

## 2. API Key 발급

1. Resend 대시보드에 로그인합니다
2. 왼쪽 메뉴에서 "API Keys"를 클릭합니다
3. "Create API Key" 버튼을 클릭합니다
4. API Key 이름을 입력합니다 (예: "NTSS Di-Me Waitlist")
5. "Full Access" 권한을 선택합니다
6. "Add" 버튼을 클릭합니다
7. **생성된 API Key를 복사하여 안전한 곳에 보관합니다** (다시 볼 수 없습니다!)

## 3. 도메인 설정 (선택사항, 권장)

무료 플랜에서는 `onboarding@resend.dev`를 발신자 주소로 사용할 수 있지만, 자신의 도메인을 사용하는 것이 더 전문적입니다.

### 도메인 추가하기

1. Resend 대시보드에서 "Domains"를 클릭합니다
2. "Add Domain" 버튼을 클릭합니다
3. 보유한 도메인 이름을 입력합니다 (예: `yourdomain.com`)
4. DNS 레코드가 표시됩니다

### DNS 레코드 설정

Resend가 제공하는 DNS 레코드를 도메인 제공업체(예: GoDaddy, Namecheap, Cloudflare)에 추가해야 합니다:

- **SPF 레코드** (TXT)
- **DKIM 레코드** (TXT)
- **DMARC 레코드** (TXT, 선택사항)

DNS 레코드 추가 후 인증이 완료될 때까지 기다립니다 (보통 몇 분~몇 시간 소요).

## 4. 환경 변수 설정

### 로컬 개발 환경

`.env.local` 파일에 다음 환경 변수를 추가합니다:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# 발신자 이메일 주소
# 도메인 설정 전: onboarding@resend.dev (기본값)
# 도메인 설정 후: noreply@yourdomain.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**주의사항:**
- `RESEND_API_KEY`는 `re_`로 시작합니다
- `.env.local` 파일은 절대 Git에 커밋하지 마세요

### Vercel 배포 환경

1. [Vercel 대시보드](https://vercel.com/dashboard)에서 프로젝트를 선택합니다
2. "Settings" > "Environment Variables"로 이동합니다
3. 다음 환경 변수를 추가합니다:
   - **Name:** `RESEND_API_KEY`
   - **Value:** 복사한 API Key (예: `re_xxxxxxxxxx`)
   - **Environment:** Production, Preview, Development 모두 선택
4. 발신자 이메일도 추가합니다:
   - **Name:** `RESEND_FROM_EMAIL`
   - **Value:** `onboarding@resend.dev` (또는 인증된 도메인 이메일)
   - **Environment:** Production, Preview, Development 모두 선택
5. "Save" 버튼을 클릭합니다
6. 프로젝트를 재배포합니다 (자동으로 재배포될 수도 있습니다)

## 5. 테스트

### 로컬 테스트

1. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```

2. http://localhost:3000 접속하여 대기명단에 등록합니다

3. 터미널에서 로그를 확인합니다:
   - `✅ 이메일 발송 성공!` - 성공
   - `❌ 이메일 발송 실패:` - 실패 (에러 메시지 확인)
   - `⚠️ RESEND_API_KEY가 설정되지 않아...` - 환경 변수 미설정

4. 등록한 이메일 주소로 확인 이메일이 도착했는지 확인합니다

### 프로덕션 테스트

Vercel 배포 후 실제 사이트에서 테스트합니다.

## 6. 이메일 템플릿 커스터마이징

이메일 내용을 수정하려면 `emails/WaitlistConfirmation.tsx` 파일을 편집하세요.

```typescript
// emails/WaitlistConfirmation.tsx
export default function WaitlistConfirmationEmail({
  name,
  waitlistNumber,
  totalWaitlist,
  registeredDate,
}: WaitlistConfirmationEmailProps) {
  // 여기서 이메일 내용 수정 가능
}
```

## 7. 요금제 정보

### 무료 플랜
- 월 3,000통 발송 가능
- 1일 100통 발송 가능
- 기본 기능 모두 사용 가능

### Pro 플랜 ($20/월)
- 월 50,000통
- 1일 무제한
- 우선 지원

대부분의 경우 무료 플랜으로 충분합니다.

## 8. 문제 해결

### 이메일이 발송되지 않는 경우

1. **환경 변수 확인**
   - `.env.local` 파일에 `RESEND_API_KEY`가 올바르게 설정되어 있는지 확인
   - 개발 서버를 재시작 (`npm run dev` 다시 실행)

2. **API Key 확인**
   - Resend 대시보드에서 API Key가 활성화되어 있는지 확인
   - API Key를 다시 생성해보기

3. **로그 확인**
   - 터미널에서 에러 메시지 확인
   - Resend 대시보드의 "Logs" 메뉴에서 발송 기록 확인

4. **발신자 이메일 확인**
   - 도메인을 설정했다면 DNS 인증이 완료되었는지 확인
   - 인증되지 않은 도메인 이메일을 사용하면 발송 실패

### 이메일이 스팸함으로 가는 경우

1. 자신의 도메인 설정 및 DNS 인증 완료
2. SPF, DKIM, DMARC 레코드 모두 설정
3. 발신자 주소를 `noreply@yourdomain.com` 형식으로 사용

## 9. Resend 대시보드 활용

Resend 대시보드에서 확인할 수 있는 정보:
- **Emails**: 발송된 이메일 목록 및 상태
- **Logs**: 상세 발송 로그 및 에러
- **Analytics**: 발송 통계, 오픈율 등

## 10. 보안 주의사항

- API Key는 절대 Git에 커밋하지 마세요
- `.gitignore`에 `.env*.local`이 포함되어 있는지 확인하세요
- API Key가 노출되었다면 즉시 Resend 대시보드에서 삭제하고 새로 발급하세요

## 참고 자료

- [Resend 공식 문서](https://resend.com/docs)
- [React Email 문서](https://react.email/docs)
- [Next.js + Resend 가이드](https://resend.com/docs/send-with-nextjs)
