'use client';

import { neodaFont } from '@/fonts/Neoda/neodaFont';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import useBasePath from '@/hooks/useBasePath';
import { Button } from '@heroui/react';

const Header = () => {
  const basePath = useBasePath(); // Use custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex justify-between items-center px-4 py-2 bg-inherit text-[#d1d3d7] rounded-xl sticky top-0 z-20'>
      <Link
        href={basePath}
        className='flex items-center gap-2 text-[#f9ffff] font-extrabold'>
        <span className={`${neodaFont.className} text-xl mb-1.5`}>S</span>
        <span className='text-lg text-[#d1d3d7]'>Splitly</span>
      </Link>
      {/* <Link
        href={basePath}
        className='flex items-center text-lg font-extrabold'></Link> */}
      <Button
        isIconOnly
        className='p-0.5 rounded-full'>
        <Bell size={16} />
      </Button>
    </div>
  );
};

export default Header;
