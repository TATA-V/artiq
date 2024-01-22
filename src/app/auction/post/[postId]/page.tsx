import AuctionDetailPost from 'src/pages/AuctionDetailPost';
import PathList from 'src/components/common/PathList';

interface Props {
  params: { postId: string }
}

async function DetailPostPage({ params: { postId } }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/posts/${postId}`, {
    method: 'GET',
    next: { revalidate: 300 },
  });
  const post = await res.json();

  return (
    <>
      <PathList />
      <AuctionDetailPost post={post} />
    </>
  );
}

export default DetailPostPage;
