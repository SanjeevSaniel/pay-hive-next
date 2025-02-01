'use client';

import Preferences from '@/components/Account/accountTabs/Preferences';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const PreferencesPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Preferences' />
      <Preferences />
    </div>
  );
};

export default PreferencesPage;
