'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

function PathList() {
  const pathname = usePathname();
  const paths = pathname?.split('/');
  paths?.shift();

  return (
    <Breadcrumbs className="mt-7 mb-11 ">
      {paths?.map((item, idx) => (
        <BreadcrumbItem key={idx}>
          {item}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default PathList;
