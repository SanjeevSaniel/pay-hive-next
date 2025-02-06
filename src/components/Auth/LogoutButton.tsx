'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { Button } from '@heroui/react';

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // New state for loading

  const onLogout = useCallback(async () => {
    setLoading(true); // Set loading to true
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
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  }, [router]);

  return (
    <Button
      isLoading={loading} // Pass the loading state to the button
      onPress={onLogout}
      className='rounded-xl'
      variant='solid'
      color='danger'>
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
