'use client';

import { Sliders } from 'lucide-react';

const Preferences = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <Sliders className='mr-2' /> Preferences
      </h2>
      <div className='flex flex-col p-3'>
        <label className='mb-1'>
          <input type='checkbox' /> Email Notifications
        </label>
        <label className='mb-1'>
          <input type='checkbox' /> SMS Notifications
        </label>
      </div>
    </div>
  );
};

export default Preferences;
