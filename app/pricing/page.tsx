'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingPlan {
  name: string
  credits: number
  price: number
  bonus?: number
  popular?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: '스타터',
    credits: 10,
    price: 9900,
  },
  {
    name: '베이직',
    credits: 30,
    price: 24900,
    bonus: 5,
    popular: true,
  },
  {
    name: '프로',
    credits: 100,
    price: 69000,
    bonus: 20,
  },
  {
    name: '비즈니스',
    credits: 300,
    price: 179000,
    bonus: 100,
  },
]

export default function PricingPage() {
  const [userId, setUserId] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = async () => {
    const email = prompt('이메일 주소를 입력하세요:')
    if (!email) return

    try {
      const response = await fetch(`/tables/users?search=${email}`)
      const data = await response.json()

      if (data.