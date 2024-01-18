'use client';

import { Spinner } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import PathList from 'src/components/common/PathList';

function AuctionEdit() {
  const UpdateEditor = dynamic(() => import('src/components/Editor/UpdateEditor'), {
    loading: () => <div className="flex justify-center w-full"><Spinner /></div>,
    ssr: false,
  });

  return (
    <>
      <PathList />
      <UpdateEditor />
    </>
  );
}

export default AuctionEdit;
