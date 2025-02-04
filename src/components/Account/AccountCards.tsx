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
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import { Avatar } from '@heroui/avatar';
import useAppStore from '@/stores/useAppStore';
import { useParams } from 'next/navigation';
import { Button } from '@heroui/react';
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { User } from '@/types/types';

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

const AccountCards = () => {
  const basePath = useBasePath(); // Use custom hook
  const params = useParams(); // Use Next.js useParams hook
  const users = useAppStore((state) => state.users); // Get users from Zustand store

  // Extract userId from the URL params
  const { userId } = params;

  // State to store the current user
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId && users) {
      const user = users.find((user) => user.userId === userId) || null;
      setCurrentUser(user);
    }
  }, [userId, users]);

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col space-y-4 p-2 text-stone-100'>
      <div className='text-center text-2xl font-extrabold mt-4 px-2'>
        Account
      </div>
      {currentUser && (
        <div className='flex flex-col gap-2 items-center'>
          <Avatar
            className='w-20 h-20'
            src={
              currentUser.profileImageUrl ||
              'https://i.pravatar.cc/150?u=a04258114e29026708c'
            }
          />
          <div className='flex flex-col items-center gap-0'>
            <div className='flex items-center gap-1 flex-wrap'>
              <span className='text-lg font-semibold'>{currentUser.name}</span>
              <span className='text-xs text-gray-400 font-semibold'>
                [@{currentUser.userId}]
              </span>
            </div>

            <span className='text-sm text-gray-400 font-semibold'>
              {currentUser.email}
            </span>
          </div>
          <Button
            startContent={<FaEdit size={18} />}
            size='md'
            color='default'
            variant='flat'>
            Edit Profile
          </Button>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={`${basePath}/account${tab.path}`}
            passHref>
            <Card className='px-2 pb-2 bg-stone-700 text-stone-100 border-stone-700 shadow-sm rounded-2xl'>
              <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
                <div className='flex justify-center items-center m-2'>
                  <tab.icon />
                </div>
                <div className='flex flex-col justify-center space-y-0.5'>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    {tab.label}
                  </CardTitle>
                  <CardDescription className='flex items-center space-x-2 text-md text-stone-400'>
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

      <div className='flex justify-center'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default AccountCards;
