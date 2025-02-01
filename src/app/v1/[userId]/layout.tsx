'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import useLenis from '@/hooks/useLenis';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return (
    <div className='grid grid-rows-layout min-h-screen'>
      <div className='p-2 sticky top-0 z-30'>
        <Header />
      </div>
      <div className='p-2 mb-14 overflow-auto'>{children}</div>
      <Navbar />
    </div>
  );
};

export default AppPageLayout;
