import { useEffect, useState, useMemo } from 'react';
import useAppStore from '@/stores/useAppStore';
import { Group, User } from '@/types/types';
import { getUsers } from '@/services/userService';

const useGroupData = (groupId: string | string[]) => {
  const id = Array.isArray(groupId) ? groupId[0] : groupId;
  const groups = useAppStore((state) => state.groups); // Get groups from Zustand state
  const users = useAppStore((state) => state.users); // Get users from Zustand state
  const setUsers = useAppStore((state) => state.setUsers); // Function to set users in Zustand store
  const financialRecords = useAppStore((state) => state.financialRecords); // Get financial records from Zustand state

  const [group, setGroup] = useState<Group | null>(null);

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
      const groupData = groups.find((group: Group) => group.groupId === id);
      if (groupData) {
        setGroup(groupData);
      }
    }
  }, [id, groups, users, setUsers]);

  const members = useMemo(
    () =>
      group?.memberIds
        ? group.memberIds
            .map((memberId) => users.find((user) => user.userId === memberId))
            .filter((user): user is User => user !== undefined)
        : [],
    [group, users],
  );

  const groupRecords = useMemo(
    () => financialRecords.filter((record) => record.groupId === id),
    [financialRecords, id],
  );

  return { group, members, groupRecords };
};

export default useGroupData;
