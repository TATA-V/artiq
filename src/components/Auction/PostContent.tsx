'use client';

import { IPostContent } from 'src/types/postType';
import styled from 'styled-components';

interface Props {
  post: IPostContent;
}

function PostContent({ post } : Props) {
  return (
    <ContentBox className="pt-20 w-full">
      {post.contentHTML && <article dangerouslySetInnerHTML={{ __html: post.contentHTML }} />}
    </ContentBox>
  );
}

export default PostContent;

const ContentBox = styled.div`
  img {
    width: 100%;
  }
  .ql-align-center {
    text-align: center;
  }
`;
