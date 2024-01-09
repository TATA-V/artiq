'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  Card, CardHeader, CardBody, Image as ImageUi, CardFooter, Button,
} from '@nextui-org/react'

export default function Home() {
  const { data: session } = useSession()
  const Editor = dynamic(() => import('src/components/common/Editor'), {
    ssr: false,
  })

  return (
    <div className="p-20 flex flex-col items-center">
      <h2 className="font-semibold text-[50px]">Aritq</h2>
      <Link href="/signin">
        {!session?.user && <div className="text-[20px] pt-[25px]">sign in</div>}
      </Link>
      {session && session.user
        && (
          <>
            {session.user.image
            && <Image width={100} height={100} className="w-[100px] h-[100px] rounded-[50%] object-cover mt-8" src={session.user.image} alt="profile" />}
            <p className="text-[20px] pt-[20px] font-semibold">안녕하세요 {session.user.name}님</p>
            <div className="pt-[30px] text-[14px] flex gap-3">
              <button onClick={() => signOut()}>
                로그아웃
              </button>
              <button onClick={() => signOut()}>
                탈퇴하기
              </button>
            </div>
          </>
        )}

      <div className="w-[700px] h-[450px] mt-10">
        <Editor />
      </div>

      {/* nextUI */}
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <ImageUi
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://ifh.cc/g/t5Z7ol.jpg"
            width={270}
          />
        </CardBody>
      </Card>

      {/* nextUI2 */}
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none"
      >
        <ImageUi
          alt="Woman listing to music"
          className="object-cover"
          height={200}
          src="https://ifh.cc/g/t5Z7ol.jpg"
          width={200}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-white/80">Available soon.</p>
          <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
            Notify me
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
