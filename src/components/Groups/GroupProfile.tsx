'use client';

import { Group } from '@/types/types';
import { Button } from '@heroui/react';
import axios from 'axios';
import { Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useCallback, useMemo } from 'react';
import useBasePath from '@/hooks/useBasePath';
import useAppStore from '@/stores/useAppStore';

interface GroupProfileProps {
  group: Group | null;
}

const GroupProfile: React.FC<GroupProfileProps> = ({ group }) => {
  const deleteGroup = useAppStore((state) => state.deleteGroup);
  const restoreGroup = useAppStore((state) => state.restoreGroup);
  const router = useRouter();
  const basePath = useBasePath();

  const handleDelete = useCallback(async () => {
    if (!group) return;

    const groupToRestore = { ...group };

    try {
      router.push(`${basePath}/groups`);
      deleteGroup(group.id);
      const response = await axios.delete(`/api/groups/${group.id}`);
      console.log('Response:', response);

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
    () => `${basePath}/groups/${group?.id}/settings`,
    [basePath, group?.id],
  );

  if (!basePath) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-2 text-[#d1d3d7]'>
      {group ? (
        <>
          <div className='flex justify-between items-center gap-1 mb-4'>
            <h1 className='text-3xl text-[#cacccf] font-bold'>{group.title}</h1>
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
