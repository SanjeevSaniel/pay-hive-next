'use client';

import { useParams } from 'next/navigation';
import useBasePath from '@/hooks/useBasePath';
import useUserData from '@/hooks/useUserData';
import UserInformation from '@/components/Account/UserInformation';
import AccountTabs from '@/components/Account/AccountTabs';
import LogoutButton from '@/components/Auth/LogoutButton';

const AccountCards = () => {
  const basePath = useBasePath(); // Use custom hook
  const { userId } = useParams(); // Use Next.js useParams hook
  const resolvedUserId = Array.isArray(userId) ? userId[0] : userId; // Ensure userId is a string

  const currentUser = useUserData(resolvedUserId); // Fetch user data using custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col space-y-4 p-2 text-stone-600'>
      <div className='text-center text-2xl font-extrabold mt-4 px-2'>
        Account
      </div>
      {currentUser && <UserInformation user={currentUser} />}
      <AccountTabs basePath={basePath} />
      <div className='flex justify-center'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default AccountCards;
