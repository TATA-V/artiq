'use client';

import { NextUIProvider } from '@nextui-org/react';

interface Props {
  children: React.ReactNode;
}

export default function NextUiProvider({ children }: Props) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
