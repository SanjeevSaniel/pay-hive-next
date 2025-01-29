'use client';

import { basePath } from '@/app/(frontend)/v1/layout';
import { CircleUserRound, Component, Home, ListTree } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { key: 'home', icon: <Home size={26} />, href: `${basePath}` },
    {
      key: 'groups',
      icon: <Component size={26} />,
      href: `${basePath}/groups`,
    },
    {
      key: 'expenses',
      icon: <ListTree size={26} />,
      href: `${basePath}/expenses`,
    },
    {
      key: 'account',
      icon: <CircleUserRound size={26} />,
      href: `${basePath}/account`,
    },
  ];

  return (
    <div className='flex justify-evenly items-center bg-[#f1f1f1] fixed left-3 bottom-3 right-3 py-4 border drop-shadow-sm rounded-xl backdrop-blur-xl'>
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}>
          <div
            className={`flex flex-col items-center ${
              pathname === item.href ? 'text-blue-500' : 'text-gray-500'
            }`}>
            {item.icon}
            {/* <span className='text-xs'>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
