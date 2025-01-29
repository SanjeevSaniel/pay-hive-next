'use client';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { BasePathProvider } from '@/context/BasePathContext';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BasePathProvider>
      <div className='min-h-screen mb-24 relative'>
        <Header />
        <div className='p-2'>{children}</div>
        <Navbar />
      </div>
    </BasePathProvider>
  );
};

export default AppPageLayout;
