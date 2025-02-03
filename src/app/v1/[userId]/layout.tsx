'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import useLenis from '@/hooks/useLenis';
import { Toaster } from 'react-hot-toast';
// import ReactQueryProvider from '@/providers/ReactQueryProvider';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return (
    // <ReactQueryProvider>
    <div className='grid grid-rows-layout min-h-screen p-2'>
      <div className='top-0 z-30'>
        <Header />
      </div>
      <div className='mb-20 overflow-auto'>{children}</div>
      <Navbar />
      <Toaster />
    </div>
    // </ReactQueryProvider>
  );
};

export default AppPageLayout;
