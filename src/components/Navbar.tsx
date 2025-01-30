import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CircleUserRound, Component, Home, ListTree } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useBasePath } from '@/context/BasePathContext';

const Navbar = () => {
  const pathname = usePathname();
  const basePath = useBasePath();

  const navItems = [
    { key: 'home', icon: Home, href: `${basePath}` },
    { key: 'groups', icon: Component, href: `${basePath}/groups` },
    { key: 'expenses', icon: ListTree, href: `${basePath}/expenses` },
    { key: 'account', icon: CircleUserRound, href: `${basePath}/account` },
  ];

  return (
    <Card className='bg-[#f1f1f1] fixed left-3 bottom-3 right-3 drop-shadow-sm rounded-xl backdrop-blur-xl z-30'>
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
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}>
                <item.icon size={28} />
                {/* <span className='text-xs'>{item.key.charAt(0).toUpperCase() + item.key.slice(1)}</span> */}
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Navbar;
