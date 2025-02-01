'use client';

import { neodaFont } from '@/fonts/Neoda/neodaFont';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import useBasePath from '@/hooks/useBasePath';

const Header = () => {
  const basePath = useBasePath(); // Use custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex justify-between items-center px-6 py-3 bg-[#424141] text-white rounded-xl sticky top-0 z-20'>
      <Link
        href={basePath}
        className='flex items-center text-lg font-extrabold'>
        <span className={`${neodaFont.className} text-xl mb-1.5`}>S</span>
        <span className='ml-2'>Splitly</span>
      </Link>
      <Bell size={22} />
    </div>
  );
};

export default Header;
