import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BaroOlrim - AI 마케팅 콘텐츠 생성기',
  description: '사진 한 장으로 인스타그램, 블로그, 스레드 콘텐츠를 5분 만에 자동 생성',
  keywords: ['AI', '마케팅', '콘텐츠 생성', '인스타그램', '블로그', 'SNS 마케팅'],
  openGraph: {
    title: 'BaroOlrim - AI 마케팅 콘텐츠 생성기',
    description: '사진 한 장으로 모든 마케팅 콘텐츠를 자동 생성',
    url: 'https://www.baroolim.com',
    siteName: 'BaroOlrim',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
