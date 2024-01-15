import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { barlow } from 'src/fonts/fonts';
import Link from 'next/link';
import Logo from 'src/components/icons/Logo';
import Naver from 'src/components/icons/Naver';
import Kakao from 'src/components/icons/Kakao';
import Google from 'src/components/icons/Google';

function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <>
      <Button color="primary" variant="flat" onPress={onOpen}>Sign In</Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent className="px-[40px] pt-[41px] pb-[60px]">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center">
                <div className="w-[30px] h-[33px] text-[#000] mr-[7px]">
                  <Logo />
                </div>
                <div className={`${barlow.className} select-none tracking-[0.08rem] text-[35px] font-[600]`}>
                  ARTIQ
                </div>
              </ModalHeader>
              <ModalBody className="pt-[43px] flex flex-col gap-3">
                <Link
                  href={`${baseUrl}/naver`}
                  className="text-[13px] tracking-[-0.02rem] flex justify-center items-center gap-2 w-full h-[46px] font-medium transform rounded-md bg-[#03C95B] text-white hover:opacity-80 focus:opacity-85 focus:outline-none transition-all duration-300 ease-in-out"
                >
                  <Naver />Continue with Naver
                </Link>

                <Link
                  href={`${baseUrl}/kakao`}
                  className="text-[13px] tracking-[-0.02rem] flex justify-center items-center gap-2 w-full h-[46px] font-medium transform rounded-md bg-[#FBE300] text-[#3B1E1E] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
                >
                  <Kakao />Continue with Kakao
                </Link>

                <Link
                  href={`${baseUrl}/google`}
                  className="text-[13px] tracking-[-0.02rem] flex justify-center items-center gap-2 border-[1px] border-[#e5e5e5] w-full h-[46px] font-medium transform rounded-md bg-white text-[#383838] transition-colors duration-200 hover:opacity-80 focus:opacity-85 focus:outline-none"
                >
                  <Google />Continue with Google
                </Link>
                <div className="text-black500 flex justify-center text-[0.76rem]">
                  기존에 사용하시는 소셜 계정으로 간편하게 Artiq를 이용해보세요.
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignInModal;
