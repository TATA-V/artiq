import AuctionDetailPost from 'src/pages/AuctionDetailPost';

function DetailPostPage({ params }: { params: { postId: string } }) {
  return (
    <AuctionDetailPost postId={params.postId} />
  );
}

export default DetailPostPage;
