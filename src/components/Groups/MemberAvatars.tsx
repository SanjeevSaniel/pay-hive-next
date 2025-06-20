import React from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/types/types';
import { Avatar, AvatarGroup, Button } from '@heroui/react';
import { Plus } from 'lucide-react';

interface MemberAvatarsProps {
  members: User[];
}

const MemberAvatars = ({ members }: MemberAvatarsProps) => {
  const params = useParams();
  const currentUserId = params.userId;

  return (
    <div className='flex items-center gap-4 px-2 my-1'>
      <div className='flex flex-col justify-center items-center gap-1'>
        <Button
          isIconOnly
          size='md'
          radius='full'>
          <Plus size={24} />
        </Button>
        <span className='text-[#cacccf] text-xs'>Add</span>
      </div>

      <AvatarGroup isBordered>
        {members.map((member) => (
          <Avatar
            key={member.userId}
            isBordered
            size='lg'
            radius='full'
            name={member.userId === currentUserId ? 'You' : member.name}
            // src={member.profileImageUrl}
          />
        ))}
      </AvatarGroup>
    </div>
  );
};

export default MemberAvatars;
