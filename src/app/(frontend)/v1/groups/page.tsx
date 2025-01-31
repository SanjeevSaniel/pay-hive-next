'use client';

import AddGroup from '@/components/Groups/AddGroup';
import { getGroups } from '@/services/groupService';
import { getFinancialRecords } from '@/services/financialRecordService';
import useAppStore from '@/stores/useAppStore';
import { useEffect, useMemo, useState } from 'react';
import GroupCard from '@/components/Groups/GroupCard';
import TotalGroupSpendCard from '@/components/Groups/TotalGroupSpendCard';
import { Group, FinancialRecord } from '@/types/types';

// Function to get the default group
const getDefaultGroup = (groups: Group[]) => {
  return groups.find((group: Group) => group.groupType === 'default') || null;
};

const GroupsPage = () => {
  const groups = useAppStore((state) => state.groups as Group[]);
  const setGroups = useAppStore((state) => state.setGroups);
  const financialRecords = useAppStore(
    (state) => state.financialRecords as FinancialRecord[],
  );
  const setFinancialRecords = useAppStore((state) => state.setFinancialRecords);
  const [defaultGroup, setDefaultGroup] = useState<Group | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data); // Initialize groups from the server
        // Check for the default group and update state
        const defaultGroup = getDefaultGroup(response.data);
        setDefaultGroup(defaultGroup);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    const fetchFinancialRecords = async () => {
      try {
        const response = await getFinancialRecords();
        setFinancialRecords(response.data); // Initialize financial records from the server
      } catch (error) {
        console.error('Failed to fetch financial records:', error);
      }
    };

    if (groups.length === 0) {
      fetchGroups(); // Fetch groups if the list is empty
    } else {
      // Check for the default group and update state
      const defaultGroup = getDefaultGroup(groups);
      setDefaultGroup(defaultGroup);
    }

    if (financialRecords.length === 0) {
      fetchFinancialRecords(); // Fetch financial records if the list is empty
    }
  }, [groups, setGroups, setFinancialRecords, financialRecords]);

  // Sort groups by creation date and filter out the default group
  const sortedGroups = useMemo(
    () =>
      [...groups]
        .filter((group) => group.groupType !== 'default')
        .sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime(),
        ),
    [groups],
  );

  // Calculate total spend
  const totalSpend = useMemo(() => {
    const groupSpendMap = financialRecords.reduce((acc, record) => {
      if (record.groupId) {
        acc[record.groupId] = (acc[record.groupId] || 0) + record.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.values(groupSpendMap).reduce(
      (total, spend) => total + spend,
      0,
    );
  }, [financialRecords]);

  return (
    <div className='flex flex-col gap-0 w-full relative'>
      <div className='flex justify-between items-center px-4 py-2 sticky top-0'>
        <div className='flex items-center space-x-2 my-2'>
          <span className='text-2xl font-extrabold'>Groups</span>
          <span className='text-sm border p-1 rounded-lg'>
            {sortedGroups.length}
          </span>
        </div>
        <AddGroup />
      </div>

      {/* Total Group Spend Card */}
      <div className='p-2'>
        <TotalGroupSpendCard totalSpend={totalSpend} />
      </div>

      <div className='grid grid-cols-1 gap-2 p-2'>
        {/* Default Group Card */}
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
    </div>
  );
};

export default GroupsPage;
