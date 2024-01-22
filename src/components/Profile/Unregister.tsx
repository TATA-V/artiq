'use client';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import useUserService from 'src/services/useUserService';
import useUserStore from 'src/store/useUserStore';

function Unregister() {
  const [, , removeCookie] = useCookies(['access_token', 'refresh_token', 'user']);
  const { deleteOne } = useUserService();
  const { user, resetUser } = useUserStore((state) => state);
  const route = useRouter();

  const handleUnregister = async () => {
    if (!user) return;
    const data = await deleteOne(user.id);
    if (!data) return;
    removeCookie('user');
    removeCookie('access_token');
    removeCookie('refresh_token');
    resetUser();
    route.replace('/');
  };

  return (
    <button onClick={handleUnregister} className="mt-3 text-black700 text-sm underline">
      탈퇴하기
    </button>
  );
}

export default Unregister;
