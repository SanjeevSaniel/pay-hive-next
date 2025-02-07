'use client';

import { Card, CardContent } from '@/components/ui/card';
import useBasePath from '@/hooks/useBasePath';
import { Component, Home, ListTree } from 'lucide-react'; // Updated to use MoneyBag
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { GiCash } from 'react-icons/gi';
import { TiUserOutline } from 'react-icons/ti';

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
    { key: 'account', icon: TiUserOutline, href: `${basePath}/account` },
  ];

  return (
    <Card className='bg-[#f1f1f1] dark:bg-[#0b0e18] fixed left-16 bottom-2 right-16 drop-shadow-xl rounded-xl backdrop-blur-xl z-30'>
      <CardContent className='flex justify-evenly items-center px-0 py-3'>
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
                className={`flex flex-col items-center ${
                  isActive ? 'text-white' : 'text-gray-400'
                }`}>
                <item.icon size={28} />
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Navbar;
