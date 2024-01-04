'use client'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="p-20 flex flex-col items-center">
      <h2 className='font-semibold text-[50px]'>Main</h2>
      <Link href="/signin">
        {!session?.user && <div className='text-[20px] pt-[25px]'>sign in</div>}
      </Link>
      {session && session.user &&
        <>
          {session.user.image &&
            <img className='w-[100px] h-[100px] rounded-[50%] object-cover mt-8' src={session.user.image} />
          }
          <p className='text-[20px] pt-[20px] font-semibold'>안녕하세요 {session.user.name}님</p>
          <div className='pt-[30px] text-[14px] flex gap-3'>
            <button onClick={() => signOut()}>
              로그아웃
            </button>
            <button onClick={() => signOut()}>
              탈퇴하기
            </button>
          </div>
        </>
      }
    </div>
  )
}