'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { BasePathProvider } from '@/context/BasePathContext';
import useLenis from '@/hooks/useLenis';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  useLenis();

  return (
    <BasePathProvider>
      <div className='grid grid-rows-layout min-h-screen'>
        <div className='p-2'>
          <Header />
        </div>
        <div className='p-2 mb-14 overflow-auto'>{children}</div>
        <Navbar />
      </div>
    </BasePathProvider>
  );
};

export default AppPageLayout;
