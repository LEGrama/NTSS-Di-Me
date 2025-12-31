import { google } from 'googleapis';
import { NextResponse } from 'next/server';

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

    // 현재 시간 (한국 시간)
    const now = new Date();
    const koreaTime = new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZone: 'Asia/Seoul',
    }).format(now);

    // Google Sheets에 데이터 추가
    console.log('Google Sheets에 데이터 추가 시도...');
    console.log('Range:', 'Sheet1!A:C');
    console.log('Data:', [koreaTime, name, email]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:C', // Sheet1의 A, B, C 열에 데이터 추가
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[koreaTime, name, email]],
      },
    });

    console.log('✅ 데이터 추가 성공!');
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
