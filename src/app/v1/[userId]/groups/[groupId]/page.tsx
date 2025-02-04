'use client';

import GroupHeader from '@/components/Groups/GroupHeader';
import GroupInfo from '@/components/Groups/GroupInfo';
import GroupTransactions from '@/components/Groups/GroupTransactions';
import MemberAvatars from '@/components/Groups/MemberAvatars';
import { getUsers } from '@/services/userService';
import useAppStore from '@/stores/useAppStore';
import { Group, User, FinancialRecord } from '@/types/types';
import { useParams } from 'next/navigation';
import useBasePath from '@/hooks/useBasePath';
import { Key, useEffect, useState } from 'react';
import { Tab, Tabs } from '@heroui/tabs';
import { Card, CardBody } from '@heroui/card';
import GroupActivities from '@/components/Groups/GroupActivities';
import GroupSummary from '@/components/Groups/GroupSummary';
import { FiFileText, FiActivity, FiBarChart2 } from 'react-icons/fi';

const GroupDetails = () => {
  const { groupId } = useParams();
  const id = Array.isArray(groupId) ? groupId[0] : groupId; // Ensure groupId is a string
  const groups = useAppStore((state) => state.groups); // Get groups from Zustand state
  const users = useAppStore((state) => state.users); // Get users from Zustand state
  const setUsers = useAppStore((state) => state.setUsers); // Function to set users in Zustand store
  const financialRecords = useAppStore((state) => state.financialRecords); // Get financial records from Zustand state

  const [group, setGroup] = useState<Group | null>(null); // Set initial state to null
  const [members, setMembers] = useState<User[]>([]); // Set initial state for members
  const [groupRecords, setGroupRecords] = useState<FinancialRecord[]>([]); // Set initial state for group financial records
  const [selected, setSelected] = useState('transactions');

  const tabs = [
    {
      id: 'transactions',
      label: 'Transactions',
      content: (
        <>
          {group ? (
            <GroupTransactions records={groupRecords} />
          ) : (
            <div>Loading...</div>
          )}
        </>
      ),
      icon: <FiFileText />,
    },
    {
      id: 'activities',
      label: 'Activities',
      content: <GroupActivities />,
      icon: <FiActivity />,
    },
    {
      id: 'summary',
      label: 'Summary',
      content: <GroupSummary />,
      icon: <FiBarChart2 />,
    },
  ];

  // Wrapper function to handle selection change
  const handleSelectionChange = (key: Key) => {
    setSelected(key.toString()); // Ensure the key is converted to a string
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); // Fetch users from the API
        setUsers(response.data); // Update the Zustand store with the fetched data
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    if (users.length === 0) {
      fetchUsers(); // Fetch users if Zustand store is empty
    }

    if (id) {
      // Fetch group details from Zustand store
      const groupData = groups.find((group: Group) => group.groupId === id);
      if (groupData) {
        setGroup(groupData); // Update state if groupData is found

        // Fetch members based on member IDs, check if memberIds is defined
        const membersData = groupData.memberIds
          ? groupData.memberIds
              .map((memberId: string) =>
                users.find((user: User) => user.userId === memberId),
              )
              .filter(
                (user: User | undefined): user is User => user !== undefined,
              )
          : [];
        setMembers(membersData); // Update members state

        // Filter financial records by group ID
        const filteredRecords = financialRecords.filter(
          (record: FinancialRecord) => record.groupId === id,
        );
        setGroupRecords(filteredRecords); // Update group financial records state
      }
      // else {
      //   console.error('Group not found in Zustand store');
      // }
    }
  }, [id, groups, users, setUsers, financialRecords]);

  const basePath = useBasePath(); // Use custom hook

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  return (
    <div className='flex flex-col justify-normal gap-4 my-2 p-2 text-stone-600'>
      <GroupHeader basePath={basePath} />
      {group && (
        <GroupInfo
          basePath={basePath}
          group={group}
        />
      )}
      {group?.memberIds && <MemberAvatars members={members} />}

      <Tabs
        aria-label='Group Information tabs'
        items={tabs}
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        size='md'
        className='flex justify-evenly mb-0'>
        {(item) => (
          <Tab
            key={item.id}
            title={
              <div className='flex items-center space-x-1'>
                {item.icon}
                <span>{item.label}</span>
              </div>
            }
            className='w-full py-0'>
            <Card className='bg-transparent shadow-none'>
              <CardBody className='p-0'>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default GroupDetails;
