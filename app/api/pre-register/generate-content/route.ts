import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Google Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const contentType = formData.get('contentType') as string
    const userId = formData.get('userId') as string

    if (!image) {
      return NextResponse.json(
        { error: '이미지를 업로드해주세요.' },
        { status: 400 }
      )
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API 키가 설정되지 않았습니다.' },
        { status: 500 }
      )
    }

    // 사용자 크레딧 확인
    const userResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tables/users?search=${userId}`,
      { method: 'GET' }
    )

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: '사용자 정보를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const userData = await userResponse.json()
    const user = userData.data[0]

    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: '크레딧이 부족합니다. 크레딧을 충전해주세요.' },
        { status: 403 }
      )
    }

    // 이미지를 base64로 변환
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Gemini API를 사용하여 이미지 분석 및 콘텐츠 생성
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompts = {
      instagram: `이 이미지를 분석하고 인스타그램 게시글을 작성해주세요.
      
요구사항:
- 매력적이고 참여를 유도하는 캡션
- 관련성 높은 해시태그 20-30개 (한글과 영문 혼합)
- 이모지를 적절히 활용
- 친근하고 대화하는 듯한 톤
- 500자 이내

형식:
[캡션 내용]

[해시태그]`,

      blog: `이 이미지를 분석하고 블로그 포스트를 작성해주세요.

요구사항:
- 제목: 클릭을 유도하는 매력적인 제목
- 본문: 4000자 이상의 상세한 설명
- 구조: 서론, 본론(3-4개 섹션), 결론
- SEO 최적화된 키워드 자연스럽게 포함
- 독자에게 유용한 정보와 팁 제공
- 단락을 명확히 구분

형식:
# [제목]

## 서론
[도입부 내용]

## [본론 섹션 1]
[내용]

## [본론 섹션 2]
[내용]

## [본론 섹션 3]
[내용]

## 결론
[마무리 내용]`,

      thread: `이 이미지를 분석하고 트위터/X 스레드를 작성해주세요.

요구사항:
- 5-7개의 연결된 트윗으로 구성
- 각 트윗은 280자 이내
- 첫 트윗은 관심을 끄는 훅(hook)
- 스레드 전체가 논리적으로 연결
- 마지막은 행동 유도(CTA)
- 이모지 적절히 활용

형식:
🧵 1/
[첫 번째 트윗]

🧵 2/
[두 번째 트윗]

🧵 3/
[세 번째 트윗]

...`,
    }

    const prompt = prompts[contentType as keyof typeof prompts] || prompts.instagram

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
    ])

    const response = await result.response
    const generatedContent = response.text()

    // 생성 이력 저장
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tables/content_history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        content_type: contentType,
        image_url: '', // 실제 프로덕션에서는 이미지를 클라우드에 업로드하고 URL 저장
        generated_content: generatedContent,
        created_date: new Date().toISOString(),
      }),
    })

    // 크레딧 차감
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tables/users/${user.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: user.credits - 1,
        }),
      }
    )

    return NextResponse.json({
      success: true,
      content: generatedContent,
      remainingCredits: user.credits - 1,
    })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: '콘텐츠 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
