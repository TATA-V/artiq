import dynamic from 'next/dynamic';
import PathList from 'src/components/common/PathList';

function AuctionEdit() {
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

export default AuctionEdit;
