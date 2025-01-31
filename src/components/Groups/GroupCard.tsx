'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Boxes, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { Group } from '@/types/types';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => (
  <Link
    href={`/v1/groups/${group.groupId}`}
    key={group.groupId}>
    <Card className='px-2 pb-2 border border-gray-50 shadow-md rounded-2xl'>
      <CardHeader className='grid grid-cols-[auto_1fr_auto] gap-2 p-2'>
        <div className='flex justify-center items-center m-2'>
          <Boxes />
        </div>
        <div className='flex flex-col justify-center space-y-0.5'>
          <CardTitle className='flex items-center gap-2 text-lg'>
            {group.groupName}
          </CardTitle>
          <CardDescription className='flex items-center space-x-2 text-md'>
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

export default GroupCard;
