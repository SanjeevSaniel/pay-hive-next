'use client';

import useAppStore from '@/stores/useAppStore';
import { Group } from '@/types/types';
import { Button } from '@heroui/react';
import axios from 'axios';
import { Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import useBasePath from '@/hooks/useBasePath';

const GroupInfo = () => {
  const { groupId } = useParams();
  const deleteGroup = useAppStore((state) => state.deleteGroup);
  const restoreGroup = useAppStore((state) => state.restoreGroup);
  const groups = useAppStore((state) => state.groups); // Get groups from Zustand state
  const router = useRouter();

  const [group, setGroup] = useState<Group | null>(null); // Set initial state to null
  const basePath = useBasePath(); // Use custom hook

  useEffect(() => {
    const fetchGroupDetails = () => {
      const groupData = groups.find(
        (group: Group) => group.groupId === groupId,
      );
      if (groupData) {
        setGroup(groupData); // Update state if groupData is found
        console.log('Group found');
      } else {
        console.log('Group not found in Zustand store');
      }
    };

    fetchGroupDetails(); // Fetch group details initially

    // Re-fetch group details when groupId changes
    const handleGroupIdChange = () => {
      fetchGroupDetails();
    };

    handleGroupIdChange(); // Call the function when groupId changes or component mounts

    // Cleanup function
    return () => {
      setGroup(null); // Reset group state on component unmount
    };
  }, [groupId, groups]); // Dependencies

  if (!basePath) {
    return <div>Loading...</div>; // Display loading indicator until basePath is available
  }

  const handleDelete = async () => {
    if (!group) {
      return; // Return early if group is null
    }

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
                href={`${basePath}/groups/${group.groupId}/settings`}
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

export default GroupInfo;
