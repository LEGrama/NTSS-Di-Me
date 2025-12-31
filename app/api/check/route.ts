import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('=== 대기번호 조회 API 요청 시작 ===');
    const body = await request.json();
    const { email } = body;
    console.log('조회 이메일:', email);

    // 이메일 검증
    if (!email) {
      return NextResponse.json(
        { error: '이메일을 입력해주세요.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Google Sheets에서 데이터 조회
    console.log('Google Sheets에서 데이터 조회 중...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:C',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: '등록된 대기자가 없습니다.' },
        { status: 404 }
      );
    }

    // 이메일로 대기번호 찾기 (헤더 제외)
    let waitlistNumber = 0;
    let foundName = '';
    let foundDate = '';

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[2] && row[2].toLowerCase() === email.toLowerCase()) {
        waitlistNumber = i; // 헤더를 제외한 순서
        foundDate = row[0] || '';
        foundName = row[1] || '';
        break;
      }
    }

    if (waitlistNumber === 0) {
      return NextResponse.json(
        { error: '해당 이메일로 등록된 대기명단을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    console.log(`✅ 대기번호 조회 성공: ${waitlistNumber}번`);
    return NextResponse.json({
      waitlistNumber,
      name: foundName,
      registeredDate: foundDate,
      totalWaitlist: rows.length - 1, // 헤더 제외
    });
  } catch (error) {
    console.error('❌ Check API Error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
