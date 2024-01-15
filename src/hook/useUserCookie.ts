import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

const useUserCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);
  const { user, access_token, refresh_token } = cookies;
  const router = useRouter();

  const setUser = () => {
    setCookie('access_token', cookies.access_token, { path: '/', expires: new Date(Date.now() + 60 * 1000), secure: true, httpOnly: true });
    setCookie('refresh_token', cookies.refresh_token, { path: '/', expires: new Date(Date.now() + 120 * 1000), secure: true, httpOnly: true });
  };

  const changeUser = (updateUser: any) => {
    setCookie('user', { ...user, ...updateUser });
  };

  const removeAllUser = () => {
    removeCookie('user');
    removeCookie('access_token');
    removeCookie('refresh_token');
    router.replace('/');
  };

  return {
    setUser,
    changeUser,
    removeAllUser,
    user,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
};

export default useUserCookie;
