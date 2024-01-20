'use client';

import { useEffect, useState } from 'react';
import { PostContent } from 'src/types/postType';
import { Image, Button } from '@nextui-org/react';
import PathList from 'src/components/common/PathList';
import { useRouter } from 'next/navigation';
import { usePostService } from 'src/services/usePostService';
import styled from 'styled-components';
import * as io from 'socket.io-client';
import useUserStore from 'src/store/useUserStore';

interface Props {
  postId: string;
}

function AuctionDetailPost({ postId } : Props) {
  const [post, setPost] = useState<PostContent | null>(null);
  const { findOne, deleteOne } = usePostService();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await findOne(postId);
      if (data) {
        setPost(data);
      }
      return data;
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   socket.on('enter_chat', [] , (res) => {
  //     console.log(res)
  //   });
  // }, [socket]);
  const handleClickChat = () => {
    // if (user && post) {
    //   socket.emit('create_chat', [user.id, post.userId]);
    // }
  };

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
                  <Button onClick={() => router.push(`/auction/post/edit?id=${post.id}`)} size="sm" color="primary">
                    수정
                  </Button>
                  <Button onClick={handleDelete} size="sm" color="danger">
                    삭제
                  </Button>
                </div>

                <Button onClick={handleClickChat} className="mt-8" color="primary" variant="bordered">
                  채팅하기
                </Button>
              </div>
            </div>
          </div>

          <ContentBox className="pt-20 w-full">
            {post.contentHTML && <article dangerouslySetInnerHTML={{ __html: post.contentHTML }} />}
          </ContentBox>
        </div>
      )}
    </>
  );
}

export default AuctionDetailPost;

const ContentBox = styled.div`
  img {
    width: 100%;
  }
  .ql-align-center {
    text-align: center;
  }
`;
