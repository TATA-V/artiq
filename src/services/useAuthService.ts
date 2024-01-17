export const useAuthService = () => {
  const getNewToken = async (refreshToken: string) => {
    const res = await fetch('/api/auth/token/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${refreshToken}`,
      },
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  };

  return {
    getNewToken,
  };
};
