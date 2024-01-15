'use client';

import { NavbarMenu, NavbarMenuToggle, NavbarMenuItem, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react';
import { barlow } from 'src/fonts/fonts';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Logo from 'src/components/icons/Logo';
import { useEffect, useState } from 'react';
import useUserCookie from 'src/hook/useUserCookie';
import dynamic from 'next/dynamic';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, accessToken, refreshToken, changeUser, removeAllUser } = useUserCookie();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams?.get('search');
    if (search) {
      const decoded = JSON.parse(Buffer.from(search, 'base64').toString('utf-8'));
      changeUser(decoded);
    }
  }, []);
  const HeaderProfile = dynamic(() => import('src/components/Header/HeaderProfile'), {
    ssr: false,
  });

  const menu = [
    { name: 'Products', path: '/products' },
    { name: 'Auction', path: '/auction' },
    { name: 'Community', path: '/community' },
    { name: 'Chatting', path: '/chatting' },
  ];

  const mobileMenu = user ? [...menu, { name: 'Log Out', path: '' }] : [...menu];

  const handleClick = (name: string) => {
    if (name === 'Log Out') {
      removeAllUser();
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand onClick={() => router.push('/')} className="flex items-center cursor-pointer">
          <div className="w-[19px] h-[22px] text-[#000] mr-[6px]">
            <Logo />
          </div>
          <div className={`${barlow.className} select-none tracking-[0.08rem] text-[22px] font-[600]`}>
            ARTIQ
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menu.map((item, idx) => (
          <NavbarItem key={idx}>
            <Link className={pathname === `${item.path}` ? 'font-[600]' : 'font-[400]'} color={pathname === `${item.path}` ? 'primary' : 'foreground'} href={`${item.path}`}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderProfile />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {mobileMenu.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                item.name === 'Sign In' ? 'primary' : item.name === 'Log Out' ? 'danger' : 'foreground'
              }
              className="w-full"
              href={`${item.path}`}
              size="lg"
            >
              <div onClick={() => handleClick(item.name)}>
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
