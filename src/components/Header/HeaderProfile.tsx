import React from 'react';
import SignInModal from 'src/components/Modal/SignInModal';
import { User, DropdownSection, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import useUserStore from 'src/store/useUserStore';
import useUserCookie from 'src/hook/useUserCookie';

function HeaderProfile() {
  const router = useRouter();
  const { removeAllUser } = useUserCookie();
  const user = useUserStore((state) => state.user);

  const handleLogout = () => {
    removeAllUser();
    router.replace('/');
  };

  return (
    <>
      {user
        ? (
          <>
            <Dropdown radius="sm">
              <DropdownTrigger>
                <Avatar className="w-[35px] h-[35px] cursor-pointer" isBordered color="default" src={`${user.profileUrl}`} />
              </DropdownTrigger>
              <DropdownMenu className="p-3">
                <DropdownSection aria-label="Profile & Actions" showDivider>
                  <DropdownItem
                    isReadOnly
                    className="h-14 gap-2 opacity-100"
                  >
                    <User
                      name={user.nickname}
                      description={user.email}
                      classNames={{
                        name: 'text-default-600',
                        description: 'text-default-500',
                      }}
                      avatarProps={{
                        size: 'sm',
                        src: `${user.profileUrl}`,
                      }}
                    />
                  </DropdownItem>
                  <DropdownItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={() => router.push('/dashboard')}>
                    Dashboard
                  </DropdownItem>
                </DropdownSection>

                <DropdownSection>
                  <DropdownItem onClick={handleLogout} key="logout" className="text-danger" color="danger">Log Out</DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </>
        )
        : <SignInModal />}
    </>
  );
}

export default HeaderProfile;
