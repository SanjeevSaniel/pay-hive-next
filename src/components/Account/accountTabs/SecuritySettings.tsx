'use client';

import { Shield } from 'lucide-react';

const SecuritySettings = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <Shield className='mr-2' /> Security Settings
      </h2>
      <div className='flex flex-col p-3'>
        <button className='mb-1'>Login History</button>
        <button className='mb-1'>Active Sessions</button>
        <button className='mb-1'>Security Questions</button>
      </div>
    </div>
  );
};

export default SecuritySettings;
