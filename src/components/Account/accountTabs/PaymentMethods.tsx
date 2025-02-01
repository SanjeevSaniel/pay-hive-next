'use client';

import { CreditCard } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <div>
      <h2 className='flex items-center gap-2 text-lg'>
        <CreditCard className='mr-2' /> Payment Methods
      </h2>
      <div className='flex flex-col p-3'>
        <button className='mb-1'>Add New Payment Method</button>
        <ul className='list-disc list-inside'>
          <li>Visa **** **** **** 1234</li>
          <li>MasterCard **** **** **** 5678</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentMethods;
