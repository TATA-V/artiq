'use client';

import { User } from '@nextui-org/react';
import useUserStore from 'src/store/useUserStore';

function Profile() {
  const user = useUserStore((state) => state.user);

  console.log('user:', user);

  return (
    <div className="mt-16">
      {user && (
        <User
          name={user.nickname}
          description={user.email}
          avatarProps={{
            src: `${user.profileUrl}`,
          }}
        />
      )}
    </div>
  );
}

export default Profile;
