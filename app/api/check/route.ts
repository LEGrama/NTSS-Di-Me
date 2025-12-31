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
      range: 'Sheet1!A:D',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: '등록된 대기자가 없습니다.' },
        { status: 404 }
      );
    }

    // 이메일로 대기번호 찾기 (헤더 제외, "완료" 상태 제외)
    let waitlistNumber = 0;
    let foundName = '';
    let foundDate = '';
    let currentNumber = 0; // "완료"를 제외한 실제 대기번호

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const status = row[3] || '미완료'; // D열 상태 (기본값: 미완료)

      // "완료" 상태가 아닌 경우에만 대기번호 증가
      if (status !== '완료') {
        currentNumber++;
      }

      // 이메일 찾기
      if (row[2] && row[2].toLowerCase() === email.toLowerCase()) {
        foundDate = row[0] || '';
        foundName = row[1] || '';

        // 해당 사용자가 "완료" 상태인 경우
        if (status === '완료') {
          return NextResponse.json(
            { error: '이미 완료 처리된 대기명단입니다.' },
            { status: 404 }
          );
        }

        waitlistNumber = currentNumber;
        break;
      }
    }

    if (waitlistNumber === 0) {
      return NextResponse.json(
        { error: '해당 이메일로 등록된 대기명단을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // "완료"를 제외한 전체 대기자 수 계산
    const totalWaitlist = rows.slice(1).filter(row => {
      const status = row[3] || '미완료';
      return status !== '완료';
    }).length;

    console.log(`✅ 대기번호 조회 성공: ${waitlistNumber}번 (전체 대기자: ${totalWaitlist}명)`);
    return NextResponse.json({
      waitlistNumber,
      name: foundName,
      registeredDate: foundDate,
      totalWaitlist,
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
