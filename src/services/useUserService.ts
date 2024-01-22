const useUserService = () => {
  const findAll = async () => {
    const res = await fetch('/api/users', {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const findOne = async (id: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'GET',
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return data;
  };

  const deleteOne = async (id: number) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    return data;
  };

  const updataOne = async (user : { payload: any, postId: string }) => {
    await fetch(`/api/users/${user.postId}`, {
      method: 'PATCH',
      body: JSON.stringify(user.payload),
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
