import React from 'react';
import { Group } from '@/types/types';

interface GroupInfoProps {
  group: Group;
}

const GroupInfo: React.FC<GroupInfoProps> = ({ group }) => {
  return (
    <div className='p-2'>
      <h1 className='text-3xl font-bold'>{group.groupName}</h1>
      <p className='text-lg'>{group.description}</p>
    </div>
  );
};

export default GroupInfo;
