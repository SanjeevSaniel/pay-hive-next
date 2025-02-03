'use client';

import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { Button } from '@heroui/react';
import axios from 'axios';
import { Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface GroupInfoProps {
  basePath: string;
  group: Group;
}

const GroupInfo = ({ group, basePath }: GroupInfoProps) => {
  const deleteGroup = useAppStore((state) => state.deleteGroup);
  const restoreGroup = useAppStore((state) => state.restoreGroup);
  const router = useRouter();

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  const handleDelete = async () => {
    // Store a copy of the group in case we need to restore it
    const groupToRestore = { ...group };

    try {
      // Navigate back to the groups page
      router.push(`${basePath}/groups`);

      // If deletion is successful, remove the group from the Zustand store
      deleteGroup(group.groupId);

      // Attempt to delete the group via API
      const response = await axios.delete(`/api/groups/${group.groupId}`);
      console.log('Response:- ', response);

      if (response.status !== 200) {
        throw new Error('Failed to delete group');
      }

      toast.success('Group deletion successfull');
    } catch (error) {
      // If deletion fails, restore the group in the Zustand store
      restoreGroup(groupToRestore);

      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Unable to delete group: ${errorMessage}`);
    }
  };

  return (
    <div className='p-2'>
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
            isIconOnly
            size='sm'
            variant='flat'
            className='p-1 rounded-xl'>
            <Link href={`${basePath}/groups/${group.groupId}/settings`}>
              <Settings
                size={20}
                className='rounded-xl'
              />
            </Link>
          </Button>
        </div>
      </div>
      <p className='text-lg'>{group.description}</p>
    </div>
  );
};

export default GroupInfo;
