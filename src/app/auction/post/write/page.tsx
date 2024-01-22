import dynamic from 'next/dynamic';
import PathList from 'src/components/common/PathList';
import { Spinner } from '@nextui-org/react';

function AuctionWritePage() {
  const NewEditor = dynamic(() => import('src/components/Editor/NewEditor'), {
    loading: () => <div className="flex justify-center w-full"><Spinner /></div>,
    ssr: false,
  });

  return (
    <>
      <PathList />
      <NewEditor />
    </>
  );
}

export default AuctionWritePage;
