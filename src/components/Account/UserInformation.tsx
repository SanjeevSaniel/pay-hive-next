'use client';

import { User } from '@/types/types';
import { Avatar } from '@heroui/avatar';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@heroui/react';

interface UserInformationProps {
  user: User;
}

const UserInformation: React.FC<UserInformationProps> = ({ user }) => {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <Avatar
        className='w-20 h-20'
        name={user.name}
        src={
          user.profileImageUrl ||
          'https://i.pravatar.cc/150?u=a04258114e29026708c'
        }
      />
      <div className='flex flex-col items-center gap-0'>
        <div className='flex items-center gap-1 flex-wrap'>
          <span className='text-lg font-semibold'>{user.name}</span>
          <span className='text-xs text-gray-400 font-semibold'>
            [@{user.userId}]
          </span>
        </div>
        <span className='text-sm text-gray-400 font-semibold'>
          {user.email}
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
  );
};

export default UserInformation;
