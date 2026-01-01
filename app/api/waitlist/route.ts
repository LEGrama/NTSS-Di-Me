import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WaitlistConfirmationEmail from '@/emails/WaitlistConfirmation';

export async function POST(request: Request) {
  try {
    console.log('=== Waitlist API 요청 시작 ===');
    const body = await request.json();
    const { name, email } = body;
    console.log('받은 데이터:', { name, email });

    // 입력값 검증
    if (!name || !email) {
      console.log('입력값 검증 실패');
      return NextResponse.json(
        { error: '이름과 이메일을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 환경 변수 확인
    console.log('환경 변수 확인:');
    console.log('- Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? '설정됨' : '없음');
    console.log('- Private Key:', process.env.GOOGLE_PRIVATE_KEY ? '설정됨' : '없음');
    console.log('- Sheet ID:', process.env.GOOGLE_SHEET_ID ? '설정됨' : '없음');

    // Google Sheets API 인증
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      console.log('스프레드시트 ID 없음');
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }
    console.log('스프레드시트 ID:', spreadsheetId);

    // 중복 이메일 체크
    console.log('기존 이메일 중복 확인 중...');
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:D',
    });

    const existingRows = checkResponse.data.values;
    if (existingRows && existingRows.length > 1) {
      // 헤더 제외하고 이메일 확인
      for (let i = 1; i < existingRows.length; i++) {
        const row = existingRows[i];
        if (row[2] && row[2].toLowerCase() === email.toLowerCase()) {
          console.log('❌ 중복 이메일 발견:', email);
          return NextResponse.json(
            { error: '이미 등록된 이메일입니다.' },
            { status: 400 }
          );
        }
      }
    }
    console.log('✅ 중복 이메일 없음');

    // 현재 시간 (한국 시간)
    const now = new Date();
    const koreaTime = new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'Asia/Seoul',
    }).format(now);

    // Google Sheets에 데이터 추가
    console.log('Google Sheets에 데이터 추가 시도...');
    console.log('Range:', 'Sheet1!A:D');
    console.log('Data:', [koreaTime, name, email, '미완료']);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D', // Sheet1의 A, B, C, D 열에 데이터 추가
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[koreaTime, name, email, '미완료']],
      },
    });

    console.log('✅ 데이터 추가 성공!');

    // Resend로 이메일 발송
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log('이메일 발송 시도 중...');

        const emailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: email,
          subject: '대기명단 등록이 완료되었습니다!',
          react: WaitlistConfirmationEmail({
            name,
            registeredDate: koreaTime,
          }),
        });

        console.log('✅ 이메일 발송 성공!');
        console.log('이메일 발송 결과:', JSON.stringify(emailResult, null, 2));
      } catch (emailError) {
        console.error('❌ 이메일 발송 실패:', emailError);
        // 이메일 발송 실패해도 등록은 성공으로 처리
      }
    } else {
      console.log('⚠️ RESEND_API_KEY가 설정되지 않아 이메일을 발송하지 않습니다.');
    }

    return NextResponse.json(
      { message: '대기명단에 성공적으로 등록되었습니다!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Waitlist API Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
