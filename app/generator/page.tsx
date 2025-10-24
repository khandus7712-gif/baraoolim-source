'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type ContentType = 'instagram' | 'blog' | 'thread'

export default function GeneratorPage() {
  const [userId, setUserId] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [credits, setCredits] = useState(0)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [contentType, setContentType] = useState<ContentType>('instagram')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogin = async () => {
    // 간단한 이메일 기반 로그인 (실제로는 NextAuth 등을 사용)
    const email = prompt('이메일 주소를 입력하세요:')
    if (!email) return

    try {
      // 사용자 조회
      const response = await fetch(`/tables/users?search=${email}`)
      const data = await response.json()

      if (data.data && data.data.length > 0) {
        const user = data.data[0]
        setUserId(user.id)
        setCredits(user.credits)
        setIsLoggedIn(true)
        alert(`로그인 성공! 현재 크레딧: ${user.credits}개`)
      } else {
        alert('등록되지 않은 이메일입니다. 먼저 사전예약을 진행해주세요.')
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.')
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert('이미지를 선택해주세요.')
      return
    }

    if (!isLoggedIn) {
      alert('로그인이 필요합니다.')
      return
    }

    if (credits < 1) {
      alert('크레딧이 부족합니다. 크레딧을 충전해주세요.')
      return
    }

    setIsGenerating(true)
    setGeneratedContent('')

    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('contentType', contentType)
      formData.append('userId', userId)

      const response = await fetch('/api/generate-content', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setGeneratedContent(data.content)
        setCredits(data.remainingCredits)
        alert(`콘텐츠 생성 완료! 남은 크레딧: ${data.remainingCredits}개`)
      } else {
        alert(data.error || '콘텐츠 생성 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Generation error:', error)
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('클립보드에 복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            BaroOlrim
          </Link>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="bg-primary-100 px-4 py-2 rounded-lg">
                  <span className="font-bold text-primary-700">크레딧: {credits}개</span>
                </div>
                <Link
                  href="/pricing"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  크레딧 충전
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          AI 콘텐츠 생성기
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Input */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. 이미지 업로드</h2>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-colors mb-6"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <div>
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-gray-600">클릭하여 이미지 선택</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. 콘텐츠 타입 선택</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => setContentType('instagram')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === 'instagram'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}
              >
                <div className="text-3xl mb-2">📸</div>
                <div className="font-bold">인스타그램</div>
              </button>
              <button
                onClick={() => setContentType('blog')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === 'blog'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}
              >
                <div className="text-3xl mb-2">📝</div>
                <div className="font-bold">블로그</div>
              </button>
              <button
                onClick={() => setContentType('thread')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  contentType === 'thread'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}
              >
                <div className="text-3xl mb-2">🧵</div>
                <div className="font-bold">스레드</div>
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !isLoggedIn || isGenerating}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? '생성 중...' : '✨ AI 콘텐츠 생성하기'}
            </button>

            {!isLoggedIn && (
              <p className="text-sm text-red-600 text-center mt-4">
                * 콘텐츠 생성을 위해 로그인이 필요합니다
              </p>
            )}
          </div>

          {/* Right Panel - Output */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">생성된 콘텐츠</h2>
              {generatedContent && (
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  📋 복사하기
                </button>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 min-h-[500px] max-h-[600px] overflow-y-auto">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
                  <p className="text-gray-600">AI가 콘텐츠를 생성하고 있습니다...</p>
                </div>
              ) : generatedContent ? (
                <pre className="whitespace-pre-wrap text-gray-800 font-sans">
                  {generatedContent}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="text-6xl mb-4">✨</div>
                  <p>생성된 콘텐츠가 여기에 표시됩니다</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
