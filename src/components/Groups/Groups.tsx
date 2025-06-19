'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAppStore from '@/stores/useAppStore';
import { ArrowDownRight, Boxes } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import AddGroup from './AddGroup';
import { getGroups } from '@/services/groupService';

const Groups = () => {
  const groups = useAppStore((state) => state.groups);
  const setGroups = useAppStore((state) => state.setGroups);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data); // Initialize groups from the server
      } catch (error) {
        console.error('Failed to fetch groups:', error);
      }
    };

    if (groups.length === 0) {
      fetchGroups(); // Fetch groups if the list is empty
    }
  }, [setGroups, groups.length]);

  return (
    <div className='flex flex-col gap-0 w-full relative'>
      <div className='flex justify-between items-center px-4 py-2 sticky top-0'>
        <div className='flex items-center space-x-2 my-2'>
          <span className='text-2xl font-extrabold'>Groups</span>
          <span className='text-sm border p-1 rounded-lg'>{groups.length}</span>
        </div>
        <AddGroup />
      </div>

      <div className='grid grid-cols-1 gap-2 p-2'>
        {groups.map((group, index) => (
          <Link
            href={`/v1/groups/${group.id}`}
            key={index}>
            <Card className='border border-gray-200 shadow-none rounded-2xl'>
              <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
                <div className='flex justify-center items-center m-2'>
                  <Boxes />
                </div>
                <div className='flex flex-col justify-center space-y-0.5'>
                  <CardTitle className='flex items-center gap-2'>
                    <span>{group.title}</span>
                  </CardTitle>
                  <CardDescription className='flex items-center space-x-2'></CardDescription>
                </div>
                <div className='flex justify-center items-center'>
                  <ArrowDownRight color='#c9c9c7' />
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Groups;
