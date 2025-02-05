'use client';

import GroupHeader from '@/components/Groups/GroupHeader';
import GroupTabs from '@/components/Groups/GroupTabs';
import GroupProfile from '@/components/Groups/GroupProfile';
import MemberAvatars from '@/components/Groups/MemberAvatars';
import useBasePath from '@/hooks/useBasePath';
import useGroupData from '@/hooks/useGroupData';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const GroupDetails = () => {
  const { groupId } = useParams();
  const basePath = useBasePath(); // Use custom hook

  const { group, members, groupRecords } = useGroupData(groupId);

  const memberAvatars = useMemo(
    () => group?.memberIds && <MemberAvatars members={members} />,
    [group?.memberIds, members],
  );

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col justify-normal gap-4 my-2 p-1 text-stone-600'>
      <GroupHeader basePath={basePath} />
      <GroupProfile group={group} />
      {memberAvatars}
      <GroupTabs
        group={group}
        groupRecords={groupRecords}
      />
    </div>
  );
};

export default GroupDetails;
