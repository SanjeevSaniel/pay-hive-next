'use client';

import PaymentMethods from '@/components/Account/accountTabs/PaymentMethods';
import AccountSectionHeader from '@/components/Account/AccountSectionHeader';

const PaymentMethodsPage = () => {
  return (
    <div className='p-4'>
      <AccountSectionHeader heading='Payment Methods' />
      <PaymentMethods />
    </div>
  );
};

export default PaymentMethodsPage;
