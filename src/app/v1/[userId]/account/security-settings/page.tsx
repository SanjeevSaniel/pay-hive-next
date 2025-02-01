'use client';

import SecuritySettings from '@/components/Account/accountTabs/SecuritySettings';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const SecuritySettingsPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Security Settings' />
      <SecuritySettings />
    </div>
  );
};

export default SecuritySettingsPage;
