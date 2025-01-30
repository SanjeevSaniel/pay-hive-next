import { User } from '@/types/types';
import { Avatar, AvatarGroup, Button } from '@heroui/react';
import { Plus } from 'lucide-react';

interface MemberAvatarsProps {
  members: User[];
}

const MemberAvatars = ({ members }: MemberAvatarsProps) => {
  return (
    <div className='flex items-center gap-4 px-2 my-1'>
      <Button
        isIconOnly
        size='lg'
        radius='full'>
        <Plus size={28} />
      </Button>
      <AvatarGroup isBordered>
        {members.map((member) => (
          <Avatar
            key={member.userId}
            isBordered
            size='lg'
            radius='full'
            name={member.name}
            // src={
            //   member.profileImageUrl ||
            //   'https://i.pravatar.cc/150?u=a04258114e29026708c'
            // }
          />
        ))}
      </AvatarGroup>
    </div>
  );
};

export default MemberAvatars;
