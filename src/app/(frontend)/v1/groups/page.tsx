'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useAppStore from '@/stores/useAppStore';
import { ArrowDownRight, Boxes, Users } from 'lucide-react';
import Link from 'next/link';
import groupsData from '@/data/groups.json'; // Import the sample groups data
import { useEffect } from 'react';
import CreateGroup from '@/components/Groups/CreateGroup';
import { Separator } from '@/components/ui/separator';

const GroupsPage = () => {
  const groups = useAppStore((state) => state.groups);
  const setGroups = useAppStore((state) => state.setGroups);

  useEffect(() => {
    // Initialize groups with sample data from JSON file
    setGroups(groupsData);
  }, [setGroups]);

  return (
    <div className='flex flex-col gap-0 w-full relative'>
      <div className='flex justify-between items-center px-4 py-2 sticky top-0'>
        <div className='flex items-center space-x-2 my-2'>
          <span className='text-2xl font-extrabold'>Groups</span>
          <span className='text-sm border p-1 rounded-lg'>{groups.length}</span>
        </div>
        {/* <Button size='sm'>New</Button> */}
        <CreateGroup />
      </div>

      <div className='grid grid-cols-1 gap-2 p-2'>
        {groups.map((group, index) => (
          <Link
            href={`/v1/groups/${group.groupId}`}
            key={index}>
            <Card className='px-2 pb-2 border border-gray-200 shadow-none rounded-2xl'>
              <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
                <div className='flex justify-center items-center m-2'>
                  <Boxes />
                </div>
                <div className='flex flex-col justify-center space-y-0.5'>
                  <CardTitle className='flex items-center gap-2 text-xl'>
                    {group.groupName}
                    {group.isGroup && (
                      <Users
                        size={18}
                        className='border border-gray-300 rounded-full p-0.5 mb-0.5'
                      />
                    )}
                  </CardTitle>
                  <CardDescription className='flex items-center space-x-2 text-md'>
                    <div className='flex items-center space-x-2'>
                      {group.borrowedAmount > 0 && (
                        <div>Borrowed: ₹{group.borrowedAmount}</div>
                      )}
                      {group.borrowedAmount > 0 && group.owedAmount > 0 && (
                        <Separator
                          orientation='vertical'
                          className='h-4'
                        />
                      )}
                      {group.owedAmount > 0 && (
                        <div>Owed: ₹{group.owedAmount}</div>
                      )}
                    </div>
                  </CardDescription>
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

export default GroupsPage;
