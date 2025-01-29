import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export const basePath = '/v1'; // Define the default path

const AppPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen pb-24 relative'>
      <Header />
      <div className='p-2'>{children}</div>
      <Navbar />
    </div>
  );
};

export default AppPageLayout;
