import { neodaFont } from '@/fonts/Neoda/neodaFont';
import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-6 py-3 bg-[#f1f1f1] rounded-xl sticky top-0 z-20'>
      <span className={`${neodaFont.className} text-xl mb-1`}>S</span>
      <span className='text-lg font-extrabold'>Splitly</span>
      <Bell size={22} />
    </div>
  );
};

export default Header;
