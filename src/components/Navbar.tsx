'use client';

import { Card, CardContent } from '@/components/ui/card';
import useBasePath from '@/hooks/useBasePath';
import { Component, Home, ListTree } from 'lucide-react'; // Updated to use MoneyBag
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { GiCash } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();
  const basePath = useBasePath(); // Use custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  const navItems = [
    { key: 'home', icon: Home, href: `${basePath}` },
    { key: 'groups', icon: Component, href: `${basePath}/groups` },
    { key: 'expenses', icon: ListTree, href: `${basePath}/expenses` },
    // { key: 'budgeting', icon: GiCash, href: `${basePath}/budgeting` }, // Updated to use MoneyBag
    { key: 'account', icon: FaRegUserCircle, href: `${basePath}/account` },
  ];

  return (
    <Card className='bg-[#f1f1f1] dark:bg-[#0b0e18] fixed md:bottom-2 md:w-fit md:m-auto md:p-2 left-12 bottom-2 right-12 drop-shadow-xl rounded-xl backdrop-blur-xl z-30'>
      <CardContent className='grid grid-cols-4 md:flex md:gap-8 px-2 py-3'>
        {navItems.map((item) => {
          const isActive =
            item.href === basePath
              ? pathname === item.href
              : pathname.startsWith(item.href) && pathname !== basePath;

          return (
            <Link
              key={item.key}
              href={item.href}>
              <div
                className={`flex flex-col md:flex-row md:justify-center md:gap-2 items-center ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}>
                <item.icon size={22} />
                <span className='text-xs md:text-medium capitalize'>
                  {item.key}
                </span>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Navbar;
