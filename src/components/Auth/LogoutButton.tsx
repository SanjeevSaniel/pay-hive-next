'use client';

import { useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const router = useRouter();

  const onLogout = useCallback(async () => {
    try {
      const response = await axios.get('/api/users/logout');
      console.log('Logout success', response.data);
      toast.success('Logout successful');
      router.push('/v1/login');
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
  }, [router]);

  return (
    <Button
      onClick={onLogout}
      className='rounded-xl'
      variant='destructive'>
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
