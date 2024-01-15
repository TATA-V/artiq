import Link from 'next/link';
import { Button } from '@nextui-org/react';

function AuctionPage() {
  return (
    <>
      <Link href="auction/post/write">
        <Button color="primary" className="mt-[20px]">
          게시글 작성
        </Button>
      </Link>
    </>
  );
}

export default AuctionPage;
