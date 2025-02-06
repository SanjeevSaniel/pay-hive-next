'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  Settings,
  Shield,
  Sliders,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';

const TABS = [
  {
    key: 'personalInformation',
    label: 'Personal Information',
    description: 'Update your personal details.',
    icon: UserIcon,
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

interface AccountTabsProps {
  basePath: string;
}

const AccountTabs: React.FC<AccountTabsProps> = ({ basePath }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={`${basePath}/account${tab.path}`}
          passHref>
          <Card className='px-2 pb-2 bg-stone-100 text-stone-800 border-stone-100 drop-shadow rounded-2xl'>
            <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
              <div className='flex justify-center items-center m-2'>
                <tab.icon />
              </div>
              <div className='flex flex-col justify-center space-y-0.5'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  {tab.label}
                </CardTitle>
                <CardDescription className='flex items-center space-x-2 text-md text-stone-600'>
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
  );
};

export default AccountTabs;
