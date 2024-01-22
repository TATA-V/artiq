'use client';

import { useObjectUrl } from '@reactuses/core';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import useUserStore from 'src/store/useUserStore';
import getImgUrl from 'src/utils/getImgUrl';
import styled from 'styled-components';

function ProfileInfo() {
  const [, , removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);
  const { user, resetUser } = useUserStore((state) => state);
  const [file, setFile] = useState<File>();

  const url = useObjectUrl(file);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
  }, []);

  const handleChangeImg = async () => {
    // const path = `profile/${(user?.id)?.toString()}`;
    // if (!file) return;
    // await getImgUrl({ file, path });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    setFile(files && files.length > 0 ? files[0] : undefined);
  };

  const handleLogout = () => {
    removeCookie('user');
    removeCookie('access_token');
    removeCookie('refresh_token');
    resetUser();
    router.replace('/');
  };

  return (
    <div className="flex justify-center first-letter:mt-[0.5rem] pt-[22px] pb-[26px] bg-black700 h-[159px] w-full">
      <div className="w-[1024px] px-6 flex items-center">
        {user
            && (
              <>
                <input ref={fileRef} className="hidden" type="file" accept="image/jpeg, image/png" onChange={onFileChange} />
                <ImageBox onClick={() => fileRef.current?.click()}>
                  <div className="object-cover w-[100px] h-[100px] rounded-full overflow-hidden">
                    <img
                      alt="profile"
                      src={file && url ? url : user.profileUrl}
                      className="object-cover w-[100px] h-[100px] img cursor-pointer transition-all duration-200"
                    />
                  </div>
                  <div className="cursor-pointer opacity-0 hover:opacity-100 text-sm z-10 absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white font-semibold transition-opacity duration-200 rounded-full">
                    이미지 변경
                  </div>
                </ImageBox>

                <div className="pl-8">
                  <div className="text-white font-[700] text-[1.9rem]">
                    {user.nickname}
                  </div>
                  <div className="text-black500 text-base">
                    {user.email}
                  </div>
                  <button onClick={handleLogout} className="mt-3 text-black300 text-sm underline">
                    로그아웃
                  </button>
                </div>
              </>
            )}
      </div>
    </div>
  );
}

export default ProfileInfo;

const ImageBox = styled.div`
  position: relative;
  &:hover .img {
    transform: scale(1.1);
  }
`;
