'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);

      toast.error('Failed to log out');
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

export default ProfilePage;
