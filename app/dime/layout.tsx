import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NTSS Di Me - F&B 전문 비주얼 브랜딩 스튜디오",
  description: "음식의 매력을 극대화하는 전문 촬영과 디지털 메뉴판 제작 서비스. NTSS Di Me 얼리버드 대기명단 등록하세요!",
  icons: {
    icon: '/dime.svg',
  },
};

export default function DimeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
