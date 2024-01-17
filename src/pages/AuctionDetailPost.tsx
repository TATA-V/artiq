'use client';

import { useEffect, useState } from 'react';
import { PostContent } from 'src/types/postType';
import { Image, Button } from '@nextui-org/react';
import PathList from 'src/components/common/PathList';
import { useRouter } from 'next/navigation';
import { usePostService } from 'src/services/usePostService';

interface Props {
  postId: string;
}

function AuctionDetailPost({ postId } : Props) {
  const [post, setPost] = useState<PostContent | null>(null);
  const [encoded, setEncoded] = useState<string>('');
  const router = useRouter();
  const { findOne, deleteOne } = usePostService();

  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetch(`/api/posts/${postId}`, {
      //   method: 'GET',
      //   next: { revalidate: 300 },
      // });
      // const data = await res.json();
      const data = await findOne(postId);
      if (data) {
        setPost(data);
        setEncoded(Buffer.from(JSON.stringify(data), 'utf8').toString('base64'));
      }
      return data;
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (post && post.id) {
      await deleteOne(post.id);
    }
    router.back();
  };

  return (
    <>
      <PathList />
      {post
      && (
        <div>
          <div className="flex w-full">
            <Image
              isBlurred
              width={405}
              height={270}
              src={post.imgUrl}
              alt={(post.id.toString())}
              className="min-w-[405px] min-h-[270px] object-cover"
            />

            <div className="w-full">
              <div className="pl-12">
                <h2 className="font-semibold test-3xl">{post.title}</h2>
                <div>{post.author}</div>
                <p>{post.summary}</p>

                <div className="flex gap-2 mt-5">
                  <Button onClick={() => router.push(`/auction/post/edit?post=${encoded}`)} size="sm" color="primary">
                    수정
                  </Button>
                  <Button onClick={handleDelete} size="sm" color="danger">
                    삭제
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 w-full">
            {post.contentHTML && <div dangerouslySetInnerHTML={{ __html: post.contentHTML }} />}
          </div>
        </div>

      )}
    </>
  );
}

export default AuctionDetailPost;
