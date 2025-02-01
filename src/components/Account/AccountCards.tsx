'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useBasePath from '@/hooks/useBasePath';
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  Settings,
  Shield,
  Sliders,
  User,
} from 'lucide-react';
import Link from 'next/link';

const TABS = [
  {
    key: 'personalInformation',
    label: 'Personal Information',
    description: 'Update your personal details.',
    icon: User,
    path: '/personal-information',
  },
  {
    key: 'accountSettings',
    label: 'Account Settings',
    description: 'Manage your account settings.',
    icon: Settings,
    path: '/account-settings',
  },
  {
    key: 'paymentMethods',
    label: 'Payment Methods',
    description: 'Manage your payment methods.',
    icon: CreditCard,
    path: '/payment-methods',
  },
  {
    key: 'preferences',
    label: 'Preferences',
    description: 'Set your preferences.',
    icon: Sliders,
    path: '/preferences',
  },
  {
    key: 'securitySettings',
    label: 'Security Settings',
    description: 'Update your security settings.',
    icon: Shield,
    path: '/security-settings',
  },
  {
    key: 'support',
    label: 'Support',
    description: 'Get support and help.',
    icon: HelpCircle,
    path: '/support',
  },
];

const AccountCards = () => {
  const basePath = useBasePath(); // Use custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col space-y-4 p-2'>
      <div className='text-2xl font-extrabold px-2'>Account</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={`${basePath}/account${tab.path}`}
            passHref>
            <Card className='px-2 pb-2 border border-gray-50 shadow-sm rounded-2xl'>
              <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
                <div className='flex justify-center items-center m-2'>
                  <tab.icon />
                </div>
                <div className='flex flex-col justify-center space-y-0.5'>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    {tab.label}
                  </CardTitle>
                  <CardDescription className='flex items-center space-x-2 text-md'>
                    {tab.description}
                  </CardDescription>
                </div>
                <div className='flex justify-center items-center'>
                  <ChevronRight color='#c9c9c7' />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountCards;
