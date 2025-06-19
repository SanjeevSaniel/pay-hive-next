import { useEffect, useMemo, useState } from 'react';
import useAppStore from '@/stores/useAppStore';
import { Group, User } from '@/types/types';

const useGroupMembers = (groupId: string | string[] | undefined) => {
  const resolvedGroupId = useMemo(
    () => (Array.isArray(groupId) ? groupId[0] : groupId),
    [groupId],
  );
  const getGroups = useAppStore((state) => state.groups);
  const getUsers = useAppStore((state) => state.users);

  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    if (resolvedGroupId) {
      // Retrieve the group information using the groupId from the Zustand store
      const groupData = getGroups.find(
        (group: Group) => group.id === resolvedGroupId,
      );
      if (groupData) {
        // Retrieve the users associated with the memberIds
        const memberData = groupData.memberIds
          .map((memberId) =>
            getUsers.find((user: User) => user.userId === memberId),
          )
          .filter((user): user is User => user !== undefined);
        setMembers(memberData);
      }
    }
  }, [resolvedGroupId, getGroups, getUsers]);

  return members;
};

export default useGroupMembers;
