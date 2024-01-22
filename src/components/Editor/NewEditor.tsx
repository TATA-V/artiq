'use client';

import { Button, Input, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { useObjectUrl } from '@reactuses/core';
import { usePostService } from 'src/services/usePostService';
import getImgUrl from 'src/utils/getImgUrl';
import useUserStore from 'src/store/useUserStore';
import Editor from 'src/components/common/Editor';
import AuctionSelect from './AuctionSelect';

function NewEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('');
  const [file, setFile] = useState<File>();
  const url = useObjectUrl(file);
  const fileRef = useRef<HTMLInputElement>(null);

  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { insertOne } = usePostService();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    setFile(files && files.length > 0 ? files[0] : undefined);
  };

  const handleSubmit = async () => {
    if (!user) return;

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
      await insertOne(body);
      router.back();
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <>
      <input ref={fileRef} className="hidden" type="file" accept="image/jpeg, image/png" onChange={onFileChange} />
      <div className="flex gap-7">
        <div onClick={() => fileRef.current?.click()}>
          <Image
            isBlurred
            isZoomed
            width={300}
            height={200}
            alt="img"
            src={file ? url : 'https://zuvqhyraygegegljnixc.supabase.co/storage/v1/object/public/images/common/temp.png'}
            className="min-w-[300px] min-h-[200px] object-cover cursor-pointer"
          />
        </div>

        <div className="flex flex-col w-full gap-3">
          <AuctionSelect category={category} setCategory={setCategory} />

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

      <div className="w-full h-[450px] max-h-[900px] mt-9">
        <Editor content={content} setContent={setContent} />
      </div>

      <Button
        isDisabled={title.trim().length === 0 || content.trim().length === 0}
        onClick={handleSubmit}
        color="primary"
        className="my-[30px]"
      >
        등록
      </Button>
    </>
  );
}

export default NewEditor;
