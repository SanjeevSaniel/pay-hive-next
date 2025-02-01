'use client';

import PersonalInformation from '@/components/Account/accountTabs/PersonalInformation';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const PersonalInformationPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Personal Information' />
      <PersonalInformation />
    </div>
  );
};

export default PersonalInformationPage;
