'use client';

import Support from '@/components/Account/accountTabs/Support';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const SupportPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Support' />
      <Support />
    </div>
  );
};

export default SupportPage;
