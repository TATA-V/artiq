'use client';

import dynamic from 'next/dynamic';
import PathList from 'src/components/common/PathList';

function AuctionWrite() {
  const AuctionEditor = dynamic(() => import('src/components/Auction/AuctionEditor'), {
    ssr: false,
  });

  return (
    <>
      <PathList />
      <AuctionEditor />
    </>
  );
}

export default AuctionWrite;
