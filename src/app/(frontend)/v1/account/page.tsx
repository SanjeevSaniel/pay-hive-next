'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AccountPage = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: unknown) {
      // error is now `unknown`
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        // Now TypeScript knows `error` is of type `Error`, so we can safely access `error.message`
        console.error('Logout failed:', error.message);
        toast.error(`Logout failed: ${error.message}`);
      } else {
        // Handle cases where the error is not an Error object (e.g., strings, numbers, etc.)
        console.error('An unknown error occurred:', error);
        toast.error('Logout failed');
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Profile Page</h1>
      <hr />

      <button
        onClick={logout}
        className='bg-blue-600 p-1 rounded-lg'>
        Log out
      </button>
    </div>
  );
};

export default AccountPage;
