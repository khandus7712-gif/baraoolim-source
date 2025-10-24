import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 사용자 데이터베이스에 사전예약 정보 저장
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tables/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: '',
        credits: 15, // 사전예약 보너스 크레딧
        subscription_type: 'free',
        is_pre_registered: true,
        pre_register_date: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      // 이미 등록된 이메일인 경우
      if (errorData.message && errorData.message.includes('already exists')) {
        return NextResponse.json(
          { error: '이미 사전예약된 이메일입니다.' },
          { status: 400 }
        )
      }
      throw new Error('Database error')
    }

    const userData = await response.json()

    return NextResponse.json({
      success: true,
      message: '사전예약이 완료되었습니다!',
      credits: 15,
      user: userData,
    })
  } catch (error) {
    console.error('Pre-registration error:', error)
    return NextResponse.json(
      { error: '사전예약 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
