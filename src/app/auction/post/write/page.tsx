import dynamic from 'next/dynamic';
// import PostWrite from 'src/pages/PostWrite'

function PostWritePage() {
  const PostWrite = dynamic(() => import('src/pages/PostWrite'), {
    ssr: false,
  });

  return (
    <PostWrite />
  );
}

export default PostWritePage;
