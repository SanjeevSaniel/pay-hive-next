'use client';

import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { Button } from '@heroui/react';
import axios from 'axios';
import { Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect, useMemo, useCallback, useState } from 'react';
import useBasePath from '@/hooks/useBasePath';

const GroupProfile = () => {
  const { groupId } = useParams();
  const deleteGroup = useAppStore((state) => state.deleteGroup);
  const restoreGroup = useAppStore((state) => state.restoreGroup);
  const groups = useAppStore((state) => state.groups);
  const router = useRouter();

  const [group, setGroup] = useState<Group | null>(null);
  const basePath = useBasePath();

  const groupData = useMemo(
    () => groups.find((group) => group.groupId === groupId) || null,
    [groupId, groups],
  );

  useEffect(() => {
    if (groupData) {
      setGroup(groupData);
      console.log('Group found');
    } else {
      console.log('Group not found in Zustand store');
    }
  }, [groupData]);

  const handleDelete = useCallback(async () => {
    if (!group) return;

    const groupToRestore = { ...group };

    try {
      await router.push(`${basePath}/groups`);
      deleteGroup(group.groupId);
      const response = await axios.delete(`/api/groups/${group.groupId}`);
      console.log('Response:- ', response);

      if (response.status !== 200) {
        throw new Error('Failed to delete group');
      }

      toast.success('Group deletion successful');
    } catch (error) {
      restoreGroup(groupToRestore);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Unable to delete group: ${errorMessage}`);
    }
  }, [group, basePath, deleteGroup, restoreGroup, router]);

  const settingsLink = useMemo(
    () => `${basePath}/groups/${group?.groupId}/settings`,
    [basePath, group?.groupId],
  );

  if (!basePath) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-2'>
      {group ? (
        <>
          <div className='flex justify-between items-center gap-1 mb-4'>
            <h1 className='text-3xl font-bold'>{group.groupName}</h1>
            <div className='flex space-x-2'>
              <Button
                isIconOnly
                size='sm'
                variant='flat'
                className='p-1 rounded-xl'
                onPress={handleDelete}>
                <Trash2
                  size={20}
                  className='rounded-xl'
                />
              </Button>
              <Button
                as={Link}
                isIconOnly
                size='sm'
                variant='flat'
                href={settingsLink}
                className='p-1 rounded-xl'>
                <Settings
                  size={20}
                  className='rounded-xl'
                />
              </Button>
            </div>
          </div>
          <p className='text-lg'>{group.description}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GroupProfile;
