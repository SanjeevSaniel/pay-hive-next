'use client';

import { useEffect } from 'react';
import useFetchGroupsAndRecords from '@/hooks/useFetchGroupsAndRecords';
import useAppStore from '@/stores/useAppStore';
import TotalSpend from '@/components/Groups/TotalSpend';
import GroupHeaderSection from '@/components/Groups/GroupHeaderSection';
import GroupList from '@/components/Groups/GroupList';

const GroupsPage = () => {
  const { fetchGroups, fetchFinancialRecords } = useFetchGroupsAndRecords();
  const groups = useAppStore((state) => state.groups);
  const financialRecords = useAppStore((state) => state.financialRecords);

  useEffect(() => {
    if (groups.length === 0) {
      fetchGroups();
    }

    if (financialRecords.length === 0) {
      fetchFinancialRecords();
    }
  }, [
    fetchGroups,
    fetchFinancialRecords,
    groups.length,
    financialRecords.length,
  ]);

  return (
    <div className='flex flex-col gap-2 py-4 w-full relative'>
      <TotalSpend />
      <GroupHeaderSection groupsCount={groups.length} />
      {/* <Suspense fallback={<Loading />}> */}
      <GroupList groups={groups} />
      {/* </Suspense> */}
    </div>
  );
};

export default GroupsPage;
