'use client';

import { Button, Input, Image, Select, SelectItem } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useObjectUrl } from '@reactuses/core';
import useUserCookie from 'src/hook/useUserCookie';
import getImgUrl from 'src/utils/getImgUrl';

import Editor from 'src/components/common/Editor';
import { usePostService } from 'src/services/usePostService';

function AuctionEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState('');
  const url = useObjectUrl(file);
  const fileRef = useRef<HTMLInputElement>(null);

  const { user } = useUserCookie();
  const editorProps = { content, setContent };
  const router = useRouter();
  const searchParams = useSearchParams();
  const { insertOne } = usePostService();

  useEffect(() => {
    const search = searchParams?.get('post');

    if (search) {
      // const decoded = JSON.parse(Buffer.from(search, 'base64').toString('utf-8'));
      // const parse = JSON.parse(decoded);
      // postId만 가져와서 다시 데이터 요청하는 방식으로 가야 하는 건가
    }
  }, []);

  const categoryArr = [
    { id: 1, value: '그림' },
    { id: 2, value: '음악' },
    { id: 3, value: '패션/주얼리' },
    { id: 4, value: '공예' },
    { id: 5, value: '뷰티' },
    { id: 6, value: '식품' },
  ];

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    setFile(files && files.length > 0 ? files[0] : undefined);
  };

  const handleSubmit = async () => {
    if (!user.id || !file) return;

    const imgUrl = await getImgUrl({ file, path: 'auction' });
    const body = {
      userId: Number(user.id),
      title,
      imgUrl,
      category: categoryArr[Number(category) - 1].value,
      contentHTML: content,
    };

    try {
      // await fetch('/api/posts', {
      //   method: 'POST',
      //   body,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      await insertOne(body);

      router.push('/auction');
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <input ref={fileRef} className="hidden" type="file" accept="image/jpeg, image/png" onChange={onFileChange} />
      <div className="flex gap-7">
        <Image
          onClick={() => fileRef.current?.click()}
          isBlurred
          isZoomed
          width={300}
          height={200}
          alt="img"
          src={file ? url : 'https://zuvqhyraygegegljnixc.supabase.co/storage/v1/object/public/images/common/temp.png'}
          className="min-w-[300px] min-h-[200px] object-cover cursor-pointer"
        />

        <div className="flex flex-col w-full gap-3">
          <Select
            label="카테고리 선택"
            className="max-w-[12rem]"
            variant="bordered"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryArr.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            variant="bordered"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-red placeholder:text-black100 "
            placeholder="제목을 입력해주세요"
          />
        </div>
      </div>

      {user && (
        <div className="w-full h-[450px] max-h-[900px] mt-7">
          <Editor {...editorProps} />
        </div>
      )}

      <Button
        isDisabled={title.trim().length === 0 || content.trim().length === 0}
        onClick={handleSubmit}
        color="primary"
        className="my-[30px]"
      >
        등록
      </Button>
    </div>
  );
}

export default AuctionEditor;
