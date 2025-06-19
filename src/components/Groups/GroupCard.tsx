'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useBasePath from '@/hooks/useBasePath';
import { Group } from '@/types/types';
import clsx from 'clsx';
import { ArrowDownRight, Boxes, Ungroup } from 'lucide-react';
import Link from 'next/link';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const basePath = useBasePath(); // Use custom hook

  // if (!basePath) {
  //   return <div>Loading...</div>; // Display loading indicator until basePath is available
  // }

  return (
    <Link
      href={`${basePath}/groups/${group.id}`}
      key={group.id}>
      <Card
        className={clsx(
          'px-2 pb-2 bg-[#1b2227] text-white drop-shadow rounded-2xl',
          {
            'default-group-card': group.groupType === 'default',
          },
        )}>
        <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
          <div className='flex justify-center items-center m-2'>
            {group.groupType === 'default' ? <Ungroup /> : <Boxes />}
          </div>
          <div className='flex flex-col justify-center space-y-0.5 overflow-hidden whitespace-nowrap text-ellipsis'>
            <CardTitle className='flex items-center gap-2 text-lg'>
              {group.title}
            </CardTitle>
            <CardDescription className='flex items-center space-x-2 text-md text-[#cacccf]'>
              {group.description}
            </CardDescription>
          </div>
          <div className='flex justify-center items-center'>
            <ArrowDownRight color='#c9c9c7' />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default GroupCard;
