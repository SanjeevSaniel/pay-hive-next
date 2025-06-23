'use client';

import useLenis from '@/hooks/useLenis';
import React from 'react';

const GroupsLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return (
    <div className='sticky top-0 h-full w-full flex flex-col gap-2 p-2'>
      {children}
    </div>
  );
};

export default GroupsLayout;
