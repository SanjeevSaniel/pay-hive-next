'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { BasePathProvider } from '@/context/BasePathContext';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BasePathProvider>
      <div className='grid grid-rows-layout min-h-screen'>
        <Header />
        <div className='p-2 mb-14 overflow-auto'>{children}</div>
        <Navbar />
      </div>
    </BasePathProvider>
  );
};

export default AppPageLayout;
