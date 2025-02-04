'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import useLenis from '@/hooks/useLenis';
import { Toaster } from 'react-hot-toast';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return (
    <div className='grid grid-rows-layout min-h-screen p-2 bg-gradient-to-t from-stone-800 via-stone-600 to-stone-600 dark'>
      <div className='top-0 z-30'>
        <Header />
      </div>
      <div className='mb-20 overflow-auto'>{children}</div>
      <Navbar />
      <Toaster />
    </div>
  );
};

export default AppPageLayout;
