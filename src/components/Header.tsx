import { useBasePath } from '@/context/BasePathContext';
import { neodaFont } from '@/fonts/Neoda/neodaFont';
import { Bell } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const basePath = useBasePath();

  return (
    <div className='flex justify-between items-center px-6 py-3 bg-[#424141] text-white rounded-xl sticky top-0 z-20'>
      <span className={`${neodaFont.className} text-xl mb-1`}>S</span>
      <Link
        href={`${basePath}`}
        className='text-lg font-extrabold'>
        Splitly
      </Link>
      <Bell size={22} />
    </div>
  );
};

export default Header;
