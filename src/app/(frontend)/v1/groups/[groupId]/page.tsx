'use client';

import GroupHeader from '@/components/GroupHeader';
import GroupInfo from '@/components/GroupInfo';
import MemberAvatars from '@/components/MemberAvatars';
import { useBasePath } from '@/context/BasePathContext';
import { getUsers } from '@/services/userService';
import useAppStore from '@/stores/useAppStore';
import { Group, User } from '@/types/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GroupDetails = () => {
  const basePath = useBasePath();
  const { groupId } = useParams();
  const id = Array.isArray(groupId) ? groupId[0] : groupId; // Ensure groupId is a string
  const groups = useAppStore((state) => state.groups); // Get groups from Zustand state
  const users = useAppStore((state) => state.users); // Get users from Zustand state
  const setUsers = useAppStore((state) => state.setUsers); // Function to set users in Zustand store

  const [group, setGroup] = useState<Group | null>(null); // Set initial state to null
  const [members, setMembers] = useState<User[]>([]); // Set initial state for members

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

        // Fetch members based on member IDs
        const membersData = groupData.memberIds
          .map((memberId: string) =>
            users.find((user: User) => user.userId === memberId),
          )
          .filter((user: User | undefined): user is User => user !== undefined);
        setMembers(membersData); // Update members state
      } else {
        console.error('Group not found in Zustand store');
      }
    }
  }, [id, groups, users, setUsers]);

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col justify-normal gap-4 p-2'>
      <GroupHeader basePath={basePath} />
      <div className='p-2'>
        <h1 className='text-3xl font-bold'>{group.groupName}</h1>
        <p className='text-lg'>{group.description}</p>
      </div>
      <MemberAvatars members={members} />
      <GroupInfo group={group} />
    </div>
  );
};

export default GroupDetails;
