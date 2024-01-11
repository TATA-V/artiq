'use client'

import React, { useEffect, useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SignInPage() {
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    (async () => {
      const res: any = await getProviders()
      setProviders(res)
    })()
  }, [])

  return (
    <div className="p-20 flex flex-col items-center">
      <Link href="http://localhost:3001/naver">
        <button className="w-[350px] h-[46px] font-medium transform rounded-md bg-[#03C95B] tracking-wide text-white transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none">
          naver login
        </button>
      </Link>

      <Link href="http://localhost:3001/kakao">
        <button className="w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-[#FBE300] tracking-wide text-[#3B1E1E] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none">
          kakao login
        </button>
      </Link>

      <Link href="http://localhost:3001/google">
        <button className="border-[1px] border-[#e5e5e5] w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-white tracking-wide text-[#383838] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none">
          google login
        </button>
      </Link>

      {/* test */}
      <div className="flex flex-col mt-20">
        <button
          className="w-[350px] h-[46px] font-medium transform rounded-md bg-[#03C95B] tracking-wide text-white transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
        >
          naver login
        </button>

        <button
          className="w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-[#FBE300] tracking-wide text-[#3B1E1E] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          kakao login
        </button>

        <button
          className="border-[1px] border-[#e5e5e5] w-[350px] h-[46px] mt-3 font-medium transform rounded-md bg-white tracking-wide text-[#383838] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
          onClick={() => signIn('google', { redirect: true, callbackUrl: '/' })}
        >
          google login
        </button>
      </div>

      <Link href="/">
        <div className="w-[350px] first-line:text-[14px] pt-[20px]">뒤로가기</div>
      </Link>
    </div>
  )
}

export default SignInPage
