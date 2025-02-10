'use client';

import AccountCards from '@/components/Account/AccountCards';
import Header from '@/components/Header';

const AccountPage = () => {
  return (
    <div className='flex flex-col space-y-2'>
      <Header />
      <AccountCards />
    </div>
  );
};

export default AccountPage;
