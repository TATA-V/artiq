'use client';

import { Button, Input, Image, Select, SelectItem } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useObjectUrl } from '@reactuses/core';
import { usePostService } from 'src/services/usePostService';
import useUserCookie from 'src/hook/useUserCookie';
import getImgUrl from 'src/utils/getImgUrl';

import Editor from 'src/components/common/Editor';

function AuctionEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('');
  const [file, setFile] = useState<File>();
  const url = useObjectUrl(file);
  const [imgUrl, setImgUrl] = useState(url);
  const fileRef = useRef<HTMLInputElement>(null);

  const { user } = useUserCookie();
  const editorProps = { content, setContent };
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams?.get('id');
  const { findOne, insertOne, updataOne } = usePostService();

  const categoryArr = [
    { id: 1, value: '그림' },
    { id: 2, value: '음악' },
    { id: 3, value: '패션/주얼리' },
    { id: 4, value: '공예' },
    { id: 5, value: '뷰티' },
    { id: 6, value: '식품' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const data = await findOne(postId);
        setTitle(data.title);
        setImgUrl(data.imgUrl);
        setContent(data.contentHTML);
        setCategory(data.category);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setImgUrl(url);
  }, [url]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    setFile(files && files.length > 0 ? files[0] : undefined);
  };

  const handleSubmit = async () => {
    if (!user.id) return;

    let imgUrl;
    if (file) {
      imgUrl = await getImgUrl({ file, path: 'auction' });
    }
    const body = {
      userId: Number(user.id),
      title,
      imgUrl,
      category,
      contentHTML: content,
    };

    try {
      if (postId) {
        await updataOne({ payload: body, postId });
      } else {
        await insertOne(body);
      }
      router.back();
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <input ref={fileRef} className="hidden" type="file" accept="image/jpeg, image/png" onChange={onFileChange} />
      <div className="flex gap-7">
        <Image
          onClick={() => fileRef.current?.click()}
          isBlurred
          isZoomed
          width={300}
          height={200}
          alt="img"
          src={imgUrl || 'https://zuvqhyraygegegljnixc.supabase.co/storage/v1/object/public/images/common/temp.png'}
          className="min-w-[300px] min-h-[200px] object-cover cursor-pointer"
        />

        {/* defaultSelectedKeys={[`${category}`]} */}
        <div className="flex flex-col w-full gap-3">
          <Select
            label="카테고리 선택"
            className="max-w-[12rem]"
            variant="bordered"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryArr.map((item) => (
              <SelectItem key={item.value} value={item.value}>
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
            value={title}
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
        {postId ? '수정' : '등록'}
      </Button>
    </>
  );
}

export default AuctionEditor;
