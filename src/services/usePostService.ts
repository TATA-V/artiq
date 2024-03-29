import { IFindAll } from 'src/types/postType';

export const usePostService = () => {
  const findAll = async () => {
    const res = await fetch('/api/posts', {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const findOne = async (postId: string) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const deleteOne = async (postId: number) => {
    await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  };

  const insertOne = async (payload: IFindAll) => {
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const updataOne = async (post : { payload: IFindAll, postId: string }) => {
    await fetch(`/api/posts/${post.postId}`, {
      method: 'PATCH',
      body: JSON.stringify(post.payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    findAll,
    findOne,
    deleteOne,
    insertOne,
    updataOne,
  };
};
