import dynamic from 'next/dynamic';
import PathList from 'src/components/common/PathList';

function AuctionPostWrite() {
  const AuctionEditor = dynamic(() => import('src/components/AuctionPost/AuctionEditor'), {
    ssr: false,
  });

  return (
    <>
      <PathList />
      <AuctionEditor />
    </>
  );
}

export default AuctionPostWrite;
