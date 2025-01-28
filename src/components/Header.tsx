import { Bell } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-6 pt-4'>
      <span className='text-lg font-extrabold'>Pay Hive</span>
      <Bell size={22} />
    </div>
  );
};

export default Header;
