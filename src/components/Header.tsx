import { Bell } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-6 py-4 bg-[#f0efe2] sticky top-0'>
      <span className='text-lg font-extrabold'>Pay Hive</span>
      <Bell size={22} />
    </div>
  );
};

export default Header;
