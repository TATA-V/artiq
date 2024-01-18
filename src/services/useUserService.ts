const useUserService = () => {
  const findAll = async () => {
    const res = await fetch('/api/users', {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const findOne = async (postId: string) => {
    const res = await fetch(`/api/users/${postId}`, {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const deleteOne = async (postId: number) => {
    await fetch(`/api/users/${postId}`, {
      method: 'DELETE',
    });
  };

  const updataOne = async (post : { payload: any, postId: string }) => {
    await fetch(`/api/users/${post.postId}`, {
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
    updataOne,
  };
};

export default useUserService;
