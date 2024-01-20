'use client';

import { useEffect, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import useUserStore from 'src/store/useUserStore';

interface Props {
  children: ReactNode;
}

function TokenProvider({ children } : Props) {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);
  const { changeAll } = useUserStore();

  const setAuthCookies = () => {
    setCookie('access_token', cookies.access_token, { path: '/', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, expires: new Date(Date.now() + 300 * 1000) });
    setCookie('refresh_token', cookies.refresh_token, { path: '/', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, expires: new Date(Date.now() + 3600 * 1000) });
  };
  const removeAll = () => {
    removeCookie('user');
    removeCookie('access_token');
    removeCookie('refresh_token');
  };

  useEffect(() => {
    setAuthCookies();
    if (!(cookies.access_token)) {
      removeAll();
    }
    if (cookies.user) {
      changeAll(cookies.user);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!(cookies.access_token) && (cookies.refresh_token)) {
        try {
          const res = await fetch('/api/auth/token/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${cookies.refresh_token}`,
            },
            credentials: 'include',
          });
          const data = await res.json();
          if (!data) {
            setAuthCookies();
          }
        } catch (error) {
          removeAll();
        }
      }
    };
    fetchData();
  }, [cookies.access_token]);

  return (
    <>
      {children}
    </>
  );
}

export default TokenProvider;
