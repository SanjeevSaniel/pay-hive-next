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
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      if (error instanceof Error) {
        toast.error(`Logout failed: ${error.message}`);
      } else {
        toast.error('Logout failed');
      }
    }
  }, [router]);

  return (
    <Button
      onClick={onLogout}
      className='w-fit'
      variant='destructive'>
      <LogOut />
      Logout
    </Button>
  );
};

export default LogoutButton;
