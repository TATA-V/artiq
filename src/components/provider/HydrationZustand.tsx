'use client';

import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const HydrationZustand = ({ children } : Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? <div>{children}</div> : null}
    </>
  );
};

export default HydrationZustand;
