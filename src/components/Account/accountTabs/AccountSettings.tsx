'use client';

import { Settings } from 'lucide-react';

const AccountSettings = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <Settings className='mr-2' /> Account Settings
      </h2>
      <div className='flex flex-col p-3'>
        <button className='mb-1'>Change Password</button>
        <button className='mb-1'>Two-Factor Authentication</button>
        <button className='mb-1'>Manage Connected Devices</button>
        <button className='mb-1'>Delete Account</button>
      </div>
    </div>
  );
};

export default AccountSettings;
