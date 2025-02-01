'use client';

import AccountSettings from '@/components/Account/accountTabs/AccountSettings';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const AccountSettingsPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Account Settings' />
      <AccountSettings />
    </div>
  );
};

export default AccountSettingsPage;
