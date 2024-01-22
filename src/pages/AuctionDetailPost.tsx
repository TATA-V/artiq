import { IPostContent } from 'src/types/postType';
import { Image, Button, Link } from '@nextui-org/react';

import PostContent from 'src/components/Auction/PostContent';
import DeleteButton from 'src/components/Auction/DeleteButton';
import ChatButton from 'src/components/Auction/ChatButton';

interface Props {
  post: IPostContent;
}

function AuctionDetailPost({ post } : Props) {
  return (
    <>
      {post
      && (
        <div>
          <div className="flex w-full">
            <Image
              isBlurred
              width={700}
              height={565}
              src={post.imgUrl || 'https://zuvqhyraygegegljnixc.supabase.co/storage/v1/object/public/images/common/temp.png'}
              alt={(post.id.toString())}
            />

            <div className="w-full">
              <div className="pl-12">
                <h2 className="font-semibold test-3xl">{post.title}</h2>
                <div>{post.author}</div>
                <p>{post.summary}</p>

                <div className="flex gap-2 mt-5">
                  <Link href={`/auction/post/edit?id=${post.id}`}>
                    <Button size="sm" color="primary">
                      수정
                    </Button>
                  </Link>
                  <DeleteButton postId={post.id} />
                </div>

                <ChatButton postId={post.id} />
              </div>
            </div>
          </div>

          <PostContent post={post} />
        </div>
      )}
    </>
  );
}

export default AuctionDetailPost;
