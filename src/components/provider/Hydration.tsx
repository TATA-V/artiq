'use client';

import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const Hydration = ({ children } : Props) => {
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

export default Hydration;
