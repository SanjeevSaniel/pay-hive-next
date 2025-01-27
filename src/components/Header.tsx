import { Bell } from 'lucide-react';
import React from 'react';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-4 py-2'>
      <span className='text-sm'>Pay Hive</span>
      <Bell size={18} />
    </div>
  );
};

export default Header;
