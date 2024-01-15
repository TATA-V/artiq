'use client';

import { CookiesProvider } from 'react-cookie';

interface Props {
  children: React.ReactNode;
}

export default function CookieProvider({ children }: Props) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
