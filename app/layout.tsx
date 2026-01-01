import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NTSS - 소상공인을 위한 브랜딩 마케팅 인사이트",
  description: "작은 브랜드가 큰 꿈을 이루도록, NTSS가 함께합니다. NTSS Di Me 얼리버드 대기명단 등록하세요!",
  icons: {
    icon: '/icon.jpeg',
  },
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
