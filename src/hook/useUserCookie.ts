import { useCookies } from 'react-cookie';
import useUserStore from 'src/store/useUserStore';

const useUserCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);
  const { access_token, refresh_token } = cookies;
  const { user, resetUser, changeProperty } = useUserStore((state) => state);

  const setUser = () => {
    setCookie('access_token', cookies.access_token, { path: '/', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, expires: new Date(Date.now() + 300 * 1000) });
    setCookie('refresh_token', cookies.refresh_token, { path: '/', domain: `${process.env.NEXT_PUBLIC_DOMAIN}`, expires: new Date(Date.now() + 3600 * 1000) });
  };

  const changeUser = (updateUser: any) => {
    setCookie('user', { ...user, ...updateUser });
    changeProperty({ ...user, ...updateUser });
  };

  const removeAllUser = () => {
    resetUser();
    removeCookie('user');
    removeCookie('access_token');
    removeCookie('refresh_token');
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
