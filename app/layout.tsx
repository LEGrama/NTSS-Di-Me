import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "음식사진 촬영 & 디지털 메뉴판 제작 | 대기명단",
  description: "전문 음식 사진 촬영과 디지털 메뉴판 제작 서비스. 지금 대기명단에 등록하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
