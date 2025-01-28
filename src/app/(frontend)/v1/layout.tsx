import { Providers } from '@/app/providers';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen pb-24 bg-slate-50'>
      <Providers>
        <Header />
        {children}
        <Navbar />
      </Providers>
    </div>
  );
};

export default AppPageLayout;
