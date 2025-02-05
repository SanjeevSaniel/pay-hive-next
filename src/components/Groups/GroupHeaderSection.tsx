'use client';

import AddGroup from '@/components/Groups/AddGroup';

interface GroupHeaderSectionProps {
  groupsCount: number;
}

const GroupHeaderSection = ({ groupsCount }: GroupHeaderSectionProps) => (
  <div className='flex justify-between items-center pl-4 pr-2 py-2 sticky top-0'>
    <div className='flex items-center space-x-2 my-2 text-foreground'>
      <span className='text-2xl font-extrabold'>Groups</span>
      <span className='text-sm border p-1 rounded-lg'>{groupsCount}</span>
    </div>
    <AddGroup />
  </div>
);

export default GroupHeaderSection;
