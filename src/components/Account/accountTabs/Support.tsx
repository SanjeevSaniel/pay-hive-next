'use client';

import { HelpCircle } from 'lucide-react';

const Support = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <HelpCircle className='mr-2' /> Support
      </h2>
      <div className='flex flex-col p-3'>
        <button className='mb-1'>Help Center</button>
        <button className='mb-1'>Contact Support</button>
        <button className='mb-1'>FAQ</button>
      </div>
    </div>
  );
};

export default Support;
