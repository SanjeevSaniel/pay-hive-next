'use client';

import GroupNavigationHeader from '@/components/Groups/GroupNavigationHeader';
import GroupProfile from '@/components/Groups/GroupProfile';
import GroupTabs from '@/components/Groups/GroupTabs';
import MemberAvatars from '@/components/Groups/MemberAvatars';
import useBasePath from '@/hooks/useBasePath';
import useGroupData from '@/hooks/useGroupData';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const GroupDetails = () => {
  // const { groupId } = useParams();
  const params = useParams();
  const groupId = typeof params.groupId === 'string' ? params.groupId : '';
  const basePath = useBasePath(); // Use custom hook

  const { group, members, groupRecords, totalExpenses } = useGroupData(groupId);

  const memberAvatars = useMemo(
    () => group?.memberIds && <MemberAvatars members={members} />,
    [group?.memberIds, members],
  );

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col justify-normal gap-4 my-2 p-2 text-stone-600 relative'>
      <GroupNavigationHeader basePath={basePath} />
      <GroupProfile group={group} />
      {memberAvatars}

      <div className='grid w-full justify-center items-center gap-1 px-2 py-4 bg-[#ddb2b2] text-stone-900 rounded-xl'>
        <p className='text-center text-3xl font-semibold'>₹{totalExpenses}</p>
        <p className='text-md font-semibold'>Total Amount</p>
      </div>

      <GroupTabs
        group={group}
        groupRecords={groupRecords}
      />
    </div>
  );
};

export default GroupDetails;
