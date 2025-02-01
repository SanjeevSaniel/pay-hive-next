'use client';

import { User } from 'lucide-react';

const PersonalInformation = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <User className='mr-2' /> Personal Information
      </h2>
      <div className='flex flex-col p-3'>
        <p className='mb-1'>Name: John Doe</p>
        <p className='mb-1'>Email: john.doe@example.com</p>
        <p className='mb-1'>Phone: +91-12345-67890</p>
      </div>
    </div>
  );
};

export default PersonalInformation;
