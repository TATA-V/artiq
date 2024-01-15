'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@nextui-org/react';

function PostWrite() {
  const Editor = dynamic(() => import('src/components/common/Editor'), {
    ssr: false,
  });

  return (
    <div className="flex justify-center w-full mt-20">
      <div>
        <div className="w-[700px] h-[450px]">
          <Editor />
        </div>

        <Button color="primary" className="mt-[20px]">
          Button
        </Button>
      </div>
    </div>
  );
}

export default PostWrite;
