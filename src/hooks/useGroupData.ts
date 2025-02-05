import { useEffect, useState, useMemo } from 'react';
import useAppStore from '@/stores/useAppStore';
import { Group, User } from '@/types/types';
import useUsers from '@/hooks/useUsers';

const useGroupData = (groupId: string | string[]) => {
  const id = Array.isArray(groupId) ? groupId[0] : groupId;
  const groups = useAppStore((state) => state.groups);
  const financialRecords = useAppStore((state) => state.financialRecords);

  const [group, setGroup] = useState<Group | null>(null);
  const users = useUsers(); // Fetch users using the custom hook

  useEffect(() => {
    if (id) {
      const groupData = groups.find((group: Group) => group.groupId === id);
      if (groupData) {
        setGroup(groupData);
      }
    }
  }, [id, groups]);

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
