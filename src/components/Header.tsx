'use client';

import { neodaFont } from '@/fonts/Neoda/neodaFont';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Header = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Extract userId from the query parameters

  const basePath = `/v1/${userId}`;

  return (
    <div className='flex justify-between items-center px-6 py-3 bg-[#424141] text-white rounded-xl sticky top-0 z-20'>
      <span className={`${neodaFont.className} text-xl mb-1`}>S</span>
      <Link
        href={basePath}
        className='text-lg font-extrabold'>
        Splitly
      </Link>
      <Bell size={22} />
    </div>
  );
};

export default Header;
