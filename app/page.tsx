'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isPreRegistered, setIsPreRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePreRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/pre-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsPreRegistered(true)
        alert('사전예약이 완료되었습니다! 정식 오픈 시 알림을 보내드리겠습니다.')
      } else {
        alert(data.error || '사전예약 중 오류가 발생했습니다.')
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            BaroOlrim
            <span className="block text-3xl md:text-4xl mt-4 text-primary-600">
              AI Marketing Content Generator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            AI가 5분만에 인스타그램부터 블로그까지 자동 생성
          </p>
          <Link 
            href="/generator"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            로그인하고 AI 콘텐츠 생성을 시작하세요
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-lg">
            사진 한 장만으로 가게에 꼭 맞는 마케팅 콘텐츠를 AI가 자동으로 만들어 드려요.
          </p>
        </div>
      </section>

      {/* Pre-registration Event */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-primary-100 to-blue-100 rounded-3xl my-16 animate-slide-up">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            정식 오픈 사전예약 이벤트
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            사장님들의 폭발적인 관심으로 결제 시스템 최종 승인 대기 중입니다.<br />
            지금 예약하고 특별 혜택을 가장 먼저 받으세요!
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">사전예약 특별 혜택</h3>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">기본 5개 + 추가 10개! 총 <strong className="text-primary-600">15 무료 크레딧</strong> 제공</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3 text-2xl">✓</span>
                <span className="text-lg">정식 오픈 후 첫 결제 <strong className="text-primary-600">20% 할인 쿠폰</strong> 증정</span>
              </li>
            </ul>

            {!isPreRegistered ? (
              <form onSubmit={handlePreRegister} className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {isLoading ? '처리 중...' : '사<span class="cursor">█</span>