'use client';

import useAppStore from '@/stores/useAppStore';
import GroupCard from '@/components/Groups/GroupCard';
import { useEffect, useMemo } from 'react';
import { Group } from '@/types/types';

interface GroupListProps {
  groups: Group[];
}

const getDefaultGroup = (groups: Group[]) => {
  return groups.find((group: Group) => group.groupType === 'default') || null;
};

const filterDefaultGroup = (groups: Group[]) => {
  return groups.filter((group) => group.groupType !== 'default');
};

const GroupList = ({ groups }: GroupListProps) => {
  const defaultGroup = useAppStore((state) => state.defaultGroup);
  const setDefaultGroup = useAppStore((state) => state.setDefaultGroup);

  useEffect(() => {
    const defaultGroupData = getDefaultGroup(groups);
    if (defaultGroupData) {
      setDefaultGroup(defaultGroupData);
    }
  }, [groups, setDefaultGroup]);

  const sortedGroups = useMemo(
    () =>
      filterDefaultGroup(groups).sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
      ),
    [groups],
  );

  return (
    <div className='grid grid-cols-1 gap-3 p-2'>
      {defaultGroup && (
        <GroupCard
          key={defaultGroup.groupId}
          group={defaultGroup}
        />
      )}
      {sortedGroups.map((group) => (
        <GroupCard
          key={group.groupId}
          group={group}
        />
      ))}
    </div>
  );
};

export default GroupList;
