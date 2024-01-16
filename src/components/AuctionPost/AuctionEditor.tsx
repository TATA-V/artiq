'use client';

import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Editor from 'src/components/common/Editor';
import useUserCookie from 'src/hook/useUserCookie';

function AuctionEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [cookies] = useCookies(['user']);
  const { user } = useUserCookie();
  const editorProps = { content, setContent };
  const router = useRouter();

  const handleSubmit = async () => {
    if (!(user.id) || title.trim().length === 0 || content.trim().length === 0) {
      console.log('return');
      return;
    }
    console.log('user.id:', user.id);
    console.log('title:', title);
    console.log('content', content);
    const data = JSON.stringify({
      userId: user.id,
      title,
      contentHTML: content,
    });
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: data,
      });
      console.log('Status:', res.status);
      console.log('Status Text:', res.statusText);
      if (res.status !== 204) return;
      router.push('/auction');
    } catch (err) {
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <div>
      <Input
        type="text"
        variant="bordered"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-red placeholder:text-black100 mb-7"
        placeholder="제목을 입력해주세요"
      />

      {user && (
        <div className="w-full h-[450px] max-h-[900px]">
          <Editor {...editorProps} />
        </div>
      )}

      <Button
        isDisabled={title.trim().length === 0 || content.trim().length === 0}
        onClick={handleSubmit}
        color="primary"
        className="mt-[30px]"
      >
        등록
      </Button>
    </div>
  );
}

export default AuctionEditor;
