'use client';

import { useEffect, ReactNode } from 'react';
import useUserCookie from 'src/hook/useUserCookie';
import { useAuthService } from 'src/services/useAuthService';
import useUserStore from 'src/store/useUserStore';

interface Props {
  children: ReactNode;
}

function TokenProvider({ children } : Props) {
  const { user, setUser, accessToken, refreshToken, removeAllUser } = useUserCookie();
  const { getNewToken } = useAuthService();
  const { changeAll } = useUserStore();

  const setAuthCookies = () => {
    setUser();
    changeAll(user);
  };

  useEffect(() => {
    setAuthCookies();
    if (!accessToken) {
      removeAllUser();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken && refreshToken) {
        try {
          const data = await getNewToken(refreshToken);
          if (!data) {
            setAuthCookies();
          }
        } catch (error) {
          removeAllUser();
        }
      }
    };
    fetchData();
  }, [accessToken]);

  return (
    <>
      {children}
    </>
  );
}

export default TokenProvider;
